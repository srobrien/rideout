import React, { createContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../../graphql/Query';

export const AuthContext = createContext();

const Auth = ({ children }) => {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return (
    <AuthContext.Provider value={data.user}>{children}</AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.object,
};

export default Auth;
