import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { AuthContext } from '../components/context/Auth';
import AddEvent from '../components/AddEvent';

const AddEventPage = () => {
  const user = useContext(AuthContext);
  const [componentLoaded, setComponentLoaded] = useState(false);
  useEffect(() => {
    setComponentLoaded(true);
    return function cleanUp() {
      setComponentLoaded(false);
    };
  });

  if (!user && componentLoaded) {
    Router.push('/');
  }
  return <AddEvent />;
};

export default AddEventPage;
