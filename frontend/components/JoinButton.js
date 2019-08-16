import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { ADD_ATTENDEE } from '../graphql/Mutation';
import { StyledJoinButton, ButtonContainer } from './styled/StyledEvent';
import { GET_SINGLE_EVENT, CURRENT_USER_QUERY } from '../graphql/Query';
import { AuthContext } from './context/Auth';

const JoinButton = ({ id, attendees, grid, leader }) => {
  const user = useContext(AuthContext);
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
  });
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
