import React, { createContext } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../../graphql/Query';

export const AuthContext = createContext();

const Auth = ({ children }) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data }) => (
      <AuthContext.Provider value={data.user}>{children}</AuthContext.Provider>
    )}
  </Query>
);

Auth.propTypes = {
  children: PropTypes.object,
};

export default Auth;
