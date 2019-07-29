import React, { useContext, useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import { AuthContext } from '../components/context/Auth';
import SingleEvent from '../components/SingleEvent';

const EventPage = ({ query }) => {
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

  return <SingleEvent id={query.id} />;
};

export default withRouter(EventPage);
