const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addFragmentToInfo } = require('graphql-binding');

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

const Mutation = {
  async signUp(parent, args, ctx, info) {
    const email = args.email.toLowerCase();
    args.email = email;
    const isUser = await ctx.db.query.user({ where: { email } });
    if (isUser) {
      throw new Error('Email address already registered!');
    }
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
        },
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return user;
  },

  async signIn(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) throw new Error(`No such user found for ${email}`);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie(
      'token',
      token,
      {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
        domain: 'rideout.rocks',
        credentials: true,
        origin: 'https://www.rideout.rocks';
      },
      info
    );
    return user;
  },

  signOut(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'goodbye' };
  },

  async updateUser(
    parent,
    { firstName, lastName, photo, password = '' },
    ctx,
    info
  ) {
    if (password === '') {
      const updatedUserNoPW = await ctx.db.mutation.updateUser(
        {
          where: { id: ctx.request.userId },
          data: {
            firstName,
            lastName,
            photo,
          },
        },
        info
      );
      return updatedUserNoPW;
    }
    const newPassword = await bcrypt.hash(password, 10);
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        where: { id: ctx.request.userId },
        data: {
          firstName,
          lastName,
          password: newPassword,
          photo,
        },
      },
      info
    );
    return updatedUser;
  },

  async createEvent(parent, args, ctx, info) {
    const { title, description, locations, startDate } = args;
    const { userId } = ctx.request;

    const newEvent = await ctx.db.mutation.createEvent(
      {
        data: {
          title,
          description,
          locations: { create: [...locations] },
          startDate,
          leader: {
            connect: {
              id: userId,
            },
          },
        },
      },
      addFragmentToInfo(info, eventFragment)
    );
    ctx.pubsub.publish('NEW_EVENT', { newEvent });
    return newEvent;
  },

  async addAttendee(parent, args, ctx, info) {
    const { userId } = ctx.request;
    const user = await ctx.db.query.user({ where: { id: userId } });
    if (!user) throw new Error(`Not logged in`);
    const { attendees } = await ctx.db.query.event(
      { where: { id: args.id } },
      `{ attendees { id }}`
    );
    if (!attendees) throw new Error(`Not logged in`);
    let isAttending = false;
    attendees.forEach(a => {
      if (a.id === userId) {
        isAttending = true;
      }
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
      );
    } else {
      updatedEvent = await ctx.db.mutation.updateEvent(
        {
          where: { id: args.id },
          data: {
            attendees: { connect: { id: userId } },
          },
        },
        info
      );
    }

    return updatedEvent;
  },

  async createComment(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) throw new Error(`Not logged in`);
    const { id, comment } = args;
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
    );
    return newComment;
  },
};

module.exports = Mutation;
