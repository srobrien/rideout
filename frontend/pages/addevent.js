import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { AuthContext } from '../components/context/Auth';
import AddEvent from '../components/AddEvent';

// add event route '/addevent'.
const AddEventPage = () => {
  // get logged in user.
  const user = useContext(AuthContext);
  // check if component is loaded (not on server).
  const [componentLoaded, setComponentLoaded] = useState(false);
  useEffect(() => {
    setComponentLoaded(true);
    return function cleanUp() {
      setComponentLoaded(false);
    };
  });

  // if no user or component on server, push client to login page.
  if (!user && componentLoaded) {
    Router.push('/');
  }

  // else return AddEvent component.
  return <AddEvent />;
};

export default AddEventPage;
