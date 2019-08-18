import React, { createContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../../graphql/Query';

export const AuthContext = createContext();

const Auth = ({ children }) => {
  const { data } = useQuery(CURRENT_USER_QUERY); // gets currently logged in user information from the DB.
  if (data) {
    return (
      <AuthContext.Provider value={data.user}>{children}</AuthContext.Provider> // provides the user as context which can be accessed throughout the application when required.
    );
  }
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

Auth.propTypes = {
  children: PropTypes.object,
};

export default Auth;
