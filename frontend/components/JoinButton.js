import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { ADD_ATTENDEE } from '../graphql/Mutation';
import { StyledJoinButton, ButtonContainer } from './styled/StyledEvent';
import { GET_SINGLE_EVENT, CURRENT_USER_QUERY } from '../graphql/Query';
import { AuthContext } from './context/Auth';

// join button allows user to join / leave event if they are not event leader.
const JoinButton = ({ id, attendees, grid, leader }) => {
  // gets and checks currently logged in user.
  const user = useContext(AuthContext);

  // maps over event attendees and checks if user has already joined event.
  let joined = false;
  if (attendees && user) {
    attendees.forEach(a => {
      if (a.id === user.id) {
        joined = true;
      }
    });
  }

  const [addAttendee, { loading }] = useMutation(ADD_ATTENDEE, {
    variables: { id },
    refetchQueries: [
      {
        query: GET_SINGLE_EVENT,
        variables: { id },
      },
      {
        query: CURRENT_USER_QUERY,
      },
    ],
  }); // initiates addAttendee mutation which will toggle user to and from attendee list when function run.
  return (
    <ButtonContainer>
      {!leader && (
        <StyledJoinButton
          grid={grid}
          joined={joined}
          onClick={() => addAttendee()}
          disabled={loading}
        >
          {joined ? 'Leave' : 'Join'}
        </StyledJoinButton>
      )}
      {leader && <div />}
    </ButtonContainer>
  );
};

export default JoinButton;

JoinButton.propTypes = {
  id: PropTypes.string,
  attendees: PropTypes.array,
  grid: PropTypes.string,
  leader: PropTypes.bool,
};
