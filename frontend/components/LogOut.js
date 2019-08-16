import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { SIGNOUT_MUTATION } from '../graphql/Mutation';
import { CURRENT_USER_QUERY } from '../graphql/Query';
import { LogOutButton } from './styled/StyledAuthentication';

const LogOut = ({ side }) => {
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <LogOutButton side={side} onClick={() => signOut()}>
      Sign Out
      <i className="fas fa-sign-out-alt" />
    </LogOutButton>
  );
};
export default LogOut;

LogOut.propTypes = {
  side: PropTypes.bool,
};

LogOut.defaultProps = {
  side: false,
};
