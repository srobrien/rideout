import gql from 'graphql-tag';

// exported graphql mutation snippets for quick use in useMutation hooks

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $firstName: String
    $lastName: String
    $password: String
    $photo: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      password: $password
      photo: $photo
    ) {
      id
      firstName
      lastName
      password
    }
  }
`;

const CREATE_EVENT_MUTATION = gql`
  mutation CREATE_EVENT_MUTATION(
    $title: String!
    $description: String
    $startDate: DateTime!
    $locations: [Locations]
  ) {
    createEvent(
      title: $title
      description: $description
      startDate: $startDate
      locations: $locations
    ) {
      id
      title
      description
      startDate
      locations {
        description
      }
    }
  }
`;

const UPDATE_EVENT_MUTATION = gql`
  mutation UPDATE_EVENT_MUTATION(
    $id: ID!
    $title: String!
    $description: String
    $startDate: DateTime!
    $locations: [Locations]
  ) {
    updateEvent(
      id: $id
      title: $title
      description: $description
      startDate: $startDate
      locations: $locations
    ) {
      id
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      firstName
    }
  }
`;

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut {
      message
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $photo: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      photo: $photo
    ) {
      id
      email
      firstName
    }
  }
`;

const ADD_ATTENDEE = gql`
  mutation ADD_ATTENDEE($id: ID!) {
    addAttendee(id: $id) {
      title
      attendees {
        firstName
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CREATE_COMMENT($comment: String!, $id: ID!) {
    createComment(id: $id, comment: $comment) {
      id
    }
  }
`;

export {
  UPDATE_USER_MUTATION,
  CREATE_EVENT_MUTATION,
  UPDATE_EVENT_MUTATION,
  SIGNIN_MUTATION,
  SIGNOUT_MUTATION,
  SIGNUP_MUTATION,
  ADD_ATTENDEE,
  CREATE_COMMENT,
};
