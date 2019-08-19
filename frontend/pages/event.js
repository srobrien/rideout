import React, { useContext, useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { AuthContext } from '../components/context/Auth';
import SingleEvent from '../components/SingleEvent';

// event page route '/event?id:{event.id}' router information passed into args from withRouter HOC.
const EventPage = ({ router }) => {
  // checks if user logged in and component is not on the server.
  const user = useContext(AuthContext);
  const [componentLoaded, setComponentLoaded] = useState(false);
  useEffect(() => {
    setComponentLoaded(true);
    return function cleanUp() {
      setComponentLoaded(false);
    };
  });

  // if no user and component on server, push client to login page.
  if (!user && componentLoaded) {
    Router.push('/');
  }

  // else return SingleItem component.
  return <SingleEvent id={router.query.id} />;
};

// withRouter is a higher order component HOC which return the component with added info (in this case route information).
// this enables us to get the URL query string containing the event ID.
export default withRouter(EventPage);

EventPage.propTypes = {
  router: PropTypes.object,
};
