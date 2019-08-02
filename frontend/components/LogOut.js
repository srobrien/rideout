import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { SIGNOUT_MUTATION } from '../graphql/Mutation';
import { CURRENT_USER_QUERY } from '../graphql/Query';
import { LogOutButton } from './styled/StyledAuthentication';

const LogOut = ({ side }) => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signOut => (
      <LogOutButton side={side} onClick={() => signOut()}>
        Sign Out
        <i className="fas fa-sign-out-alt" />
      </LogOutButton>
    )}
  </Mutation>
);
export default LogOut;

LogOut.propTypes = {
  side: PropTypes.bool,
};

LogOut.defaultProps = {
  side: false,
};
