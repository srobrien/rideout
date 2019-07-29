import Router from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../components/context/Auth';
import RegisterForm from '../components/RegisterForm';
import { LoggedOutContainer } from '../components/styled/StyledAuthentication';

const Register = () => {
  const user = useContext(AuthContext);
  const [componentLoaded, setComponentLoaded] = useState(false);
  useEffect(() => {
    setComponentLoaded(true);
    return function cleanup() {
      setComponentLoaded(false);
    };
  });

  if (user && componentLoaded) {
    Router.push('/');
  }

  return (
    <LoggedOutContainer>
      <RegisterForm />
    </LoggedOutContainer>
  );
};

export default Register;
