import gql from 'graphql-tag';

const NEW_EVENT = gql`
  subscription {
    newEvent {
      id
      title
      startDate
      description
      locations {
        description
      }
      leader {
        firstName
        lastName
        photo
      }
    }
  }
`;

export { NEW_EVENT };
