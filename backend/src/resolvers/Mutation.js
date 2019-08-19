const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addFragmentToInfo } = require('graphql-binding');

// ensures full data set returned for event
const eventFragment = `
fragment EventsWithRelations on Event {
   id
    title
    startDate
    description
    locations {
      description
    }
    attendees {
      id
      firstName
      lastName
      photo
    }
    leader  {
      id
      firstName
      lastName
      photo
    }
  }
`;

// registers and authenticates new user
const Mutation = {
  async signUp(parent, args, ctx, info) {
    const email = args.email.toLowerCase(); // convert email to lowercase to avoid case missmatches.
    args.email = email;
    const isUser = await ctx.db.query.user({ where: { email } }); // checks the database does not already contain user with provided email address.
    if (isUser) {
      throw new Error('Email address already registered!');
    }
    const password = await bcrypt.hash(args.password, 10); // hashes provided password prior to storing in the database.
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
        },
      },
      info
    ); // creates new user in the database using information provided from register form.
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET); // creates and signs a JWT containing user ID.
    ctx.response.cookie(
      'token',
      token,
      {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      },
      info
    ); // sets a cookie on the users machine containing the JWT.
    return user; // returns newly created user to client.
  },

  // authenticates user before allowing access to application
  async signIn(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } }); // retrieves user from DB using provided email.
    if (!user) throw new Error(`No such user found for ${email}`); // checks if user is registered.
    const valid = await bcrypt.compare(password, user.password); // compares provided hashed password with password in DB.
    if (!valid) throw new Error('Invalid password');
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET); // creates and signs a JWT containing user ID.
    ctx.response.cookie(
      'token',
      token,
      {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      },
      info
    ); // sets a cookie on the users machine containing the JWT.
    return user; // returns authenticated user to the client.
  },

  // de-authenticates user from application.
  signOut(parent, args, ctx, info) {
    ctx.response.clearCookie('token'); // clears cookie containing JWT from users machine.

    return { message: 'goodbye' };
  },

  // updates user information
  async updateUser(
    parent,
    { firstName, lastName, photo, password = '' },
    ctx,
    info
  ) {
    if (password === '') {
      const updatedUserNoPW = await ctx.db.mutation.updateUser(
        {
          where: { id: ctx.request.userId }, // update the currently logged in user.
          data: {
            firstName,
            lastName,
            photo,
          },
        },
        info
      ); // updates user info in DB if no new password is provided.
      return updatedUserNoPW; // returns newly updated user to client.
    }
    const newPassword = await bcrypt.hash(password, 10); // hashes new password provided from update form.
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        where: { id: ctx.request.userId }, // update the currently logged in user
        data: {
          firstName,
          lastName,
          password: newPassword,
          photo,
        },
      },
      info
    ); // updates user info in DB if new password is provided.
    return updatedUser;
  },

  // creates a new event
  async createEvent(parent, args, ctx, info) {
    const { title, description, locations, startDate } = args; // collect and assign variables from request argument.
    const { userId } = ctx.request; // retrieve currently logged in user ID from request.

    const newEvent = await ctx.db.mutation.createEvent(
      {
        data: {
          title,
          description,
          locations: { create: [...locations] }, // create an array of location types.
          startDate,
          leader: {
            connect: {
              id: userId,
            },
          },
        },
      },
      addFragmentToInfo(info, eventFragment)
    ); // create a new event in the DB and assign relation to logged in user.

    return newEvent; // return newly created event to client.
  },

  // updates a currently stored event.
  async updateEvent(parent, args, ctx, info) {
    const { id, title, description, locations, startDate } = args; // collect and assign variables from request argument.
    const { userId } = ctx.request; // retrieve currently logged in user ID from request.
    const event = await ctx.db.query.event(
      {
        where: { id },
      },
      `{
        locations {
          id
        }
        leader {
          id
        }
      }`
    ); // retrieve all location and leader ID's related the the event.
    if (!event) {
      throw new Error('Request Failed: Invalid event ID');
    } // checks if event exists
    if (event.leader.id !== userId) {
      throw new Error('Request Failed: You are not the leader of the event');
    } // checks if current user is the leader of the event.
    const locationList = event.locations;
    locationList.map(async l => {
      await ctx.db.mutation.deleteLocation({ where: { id: l.id } });
    }); // map over location ID's and removed them from the DB, also removing relations to event.
    const updatedEvent = ctx.db.mutation.updateEvent(
      {
        where: { id },
        data: {
          title,
          description,
          locations: { create: [...locations] },
          startDate,
        },
      },
      addFragmentToInfo(info, eventFragment)
    ); // updates the event using the new information provided from the update event form.

    return updatedEvent; // return newly updated event to client.
  },

  // adds a user as an attendee to the event
  async addAttendee(parent, args, ctx, info) {
    const { userId } = ctx.request; // retrieve currently logged in user ID from request.
    const user = await ctx.db.query.user({ where: { id: userId } }); // checks if user exists
    if (!user) throw new Error(`Not logged in`);
    const { attendees } = await ctx.db.query.event(
      { where: { id: args.id } },
      `{ attendees { id }}`
    ); // retrieves a list of attendees related to the event ID provided in the request

    let isAttending = false;
    attendees.forEach(a => {
      if (a.id === userId) {
        isAttending = true;
      } // loops over list of event attendees and checks if logged in user is currently present.
    });

    let updatedEvent;
    if (isAttending) {
      updatedEvent = await ctx.db.mutation.updateEvent(
        {
          where: { id: args.id },
          data: {
            attendees: { disconnect: { id: userId } },
          },
        },
        info
      ); // if user is already attending event, remove relation to user in attendees.
    } else {
      updatedEvent = await ctx.db.mutation.updateEvent(
        {
          where: { id: args.id },
          data: {
            attendees: { connect: { id: userId } },
          },
        },
        info
      ); // if user is not already attending event, create realtion to user in attendees.
    }

    return updatedEvent; // return newly updated event to client.
  },

  // create a new event comment
  async createComment(parent, args, ctx, info) {
    const { userId } = ctx.request; // retrieve currently logged in user ID from request.
    if (!userId) throw new Error(`Not logged in`); // checks if user is authenticated.
    const { id, comment } = args; // collect and assign variables from request argument.
    const newComment = await ctx.db.mutation.createComment(
      {
        data: {
          comment,
          user: {
            connect: { id: userId },
          },
          event: {
            connect: { id },
          },
        },
      },
      info
    ); // creates new comment and adds links to event and user
    return newComment; // returns new comment to client.
  },
};

module.exports = Mutation; // exports Mutation object.
