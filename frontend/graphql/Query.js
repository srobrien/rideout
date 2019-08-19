import gql from 'graphql-tag';

// exported graphql query snippets for quick use in useQuery hooks

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    user {
      id
      email
      firstName
      lastName
      photo
      attending {
        id
        title
      }
      events {
        id
        title
      }
    }
  }
`;

const ALL_EVENTS_QUERY = gql`
  query ALL_EVENTS_QUERY {
    events(orderBy: createdAt_DESC) {
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
      leader {
        id
        firstName
        lastName
        photo
      }
    }
  }
`;

const FILTERED_EVENTS_QUERY = gql`
  query FILTERED_EVENTS_QUERY($filter: String!) {
    events(
      where: { locations_some: { description_contains: $filter } }
      orderBy: createdAt_DESC
    ) {
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
      leader {
        id
        firstName
        lastName
        photo
      }
    }
  }
`;

const GET_SINGLE_EVENT = gql`
  query GET_SINGLE_EVENT($id: ID!) {
    event(where: { id: $id }) {
      id
      title
      description
      startDate
      leader {
        id
        firstName
        lastName
        photo
      }
      locations {
        id
        description
      }
      attendees {
        id
        firstName
        lastName
        photo
      }
    }
  }
`;

const GET_COMMENTS = gql`
  query GET_COMMENTS($id: ID!) {
    comments(where: { event: { id: $id } }, orderBy: createdAt_DESC) {
      id
      comment
      createdAt
      user {
        firstName
        lastName
        photo
      }
    }
  }
`;

export {
  CURRENT_USER_QUERY,
  ALL_EVENTS_QUERY,
  FILTERED_EVENTS_QUERY,
  GET_SINGLE_EVENT,
  GET_COMMENTS,
};

// const ALL_EVENTS_QUERY = gql`
// query ALL_EVENTS_QUERY($skip: Int = 0, $first: Int = ${EVENTS_PER_PAGE}) {
//   events(first: $first, skip: $skip, orderBy: createdAt_DESC) {
//     id
//     title
//     startDate
//     description
//     locations {
//       description
//     }
//     attendees {
//       id
//       firstName
//       lastName
//       photo
//     }
//     leader  {
//       id
//       firstName
//       lastName
//       photo
//     }
//   }
// }
// `;
