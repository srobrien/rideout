import React, { useContext, useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import HomePage from '../components/HomePage';
import { LoggedOutContainer } from '../components/styled/StyledAuthentication';
import { AuthContext } from '../components/context/Auth';

const Home = () => {
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
    return <HomePage />;
  }
  return null;
};

export default Home;
