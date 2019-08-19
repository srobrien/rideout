import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { SIGNOUT_MUTATION } from '../graphql/Mutation';
import { CURRENT_USER_QUERY } from '../graphql/Query';
import { LogOutButton } from './styled/StyledAuthentication';

// logout button which will clear cookies and log user out.
const LogOut = ({ side }) => {
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  }); // initiates signOut mutation which will clear users cookie token and push them back to login.

  return (
    <LogOutButton side={side} onClick={() => signOut().then(Router.push('/'))}>
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
