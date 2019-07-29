import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import HomePage from '../components/HomePage';
import { LoggedOutContainer } from '../components/styled/StyledAuthentication';
import { AuthContext } from '../components/context/Auth';

const Home = ({ query }) => {
  const user = useContext(AuthContext);
  const [componentLoaded, setComponentLoaded] = useState(false);
  useEffect(() => {
    setComponentLoaded(true);
    return function cleanup() {
      setComponentLoaded(false);
    };
  });

  if (!user) {
    return (
      <LoggedOutContainer>
        <LoginForm />
      </LoggedOutContainer>
    );
  }

  if (componentLoaded) {
    return <HomePage page={parseFloat(query.page) || 1} />;
  }
  return null;
};

Home.propTypes = {
  query: PropTypes.object,
};

export default Home;
