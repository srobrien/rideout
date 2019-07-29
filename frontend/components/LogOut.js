import { Mutation } from 'react-apollo';
import { SIGNOUT_MUTATION } from '../graphql/Mutation';
import { CURRENT_USER_QUERY } from '../graphql/Query';
import { LogOutButton } from './styled/StyledAuthentication';

const LogOut = () => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signOut => (
      <LogOutButton onClick={() => signOut()}>
        Sign Out
        <i className="fas fa-sign-out-alt" />
      </LogOutButton>
    )}
  </Mutation>
);
export default LogOut;
