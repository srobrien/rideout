import React, { useContext, useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import isEventLeader from '../lib/isEventLeader';
import { GET_SINGLE_EVENT } from '../graphql/Query';
import { AuthContext } from '../components/context/Auth';
import EditEvent from '../components/EditEvent';

// edit event page route '/edit?id:{event.id}' takes router object as argument, supplied from withRouter HOC.
const EventPage = ({ router }) => {
  // check user logged in and component is not on server.
  const user = useContext(AuthContext);
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

  // get the event for database
  const { data } = useQuery(GET_SINGLE_EVENT, {
    variables: { id: router.query.id },
  });

  // if the event has been returned from DB and user logged in
  if (data && user) {
    if (Object.values(data).length === 0) {
      return null;
    }
    // get the event leader id.
    const leaderId = data.event.leader.id || '';
    //  if user is not event leader push to events page.
    if (!isEventLeader(user.id, leaderId)) {
      Router.push('/events');
      return null;
    }
    // else return EditEvent
    return <EditEvent event={data.event} />;
  }

  return null;
};
// withRouter is a higher order component HOC which return the component with added info (in this case route information).
// this enables us to get the URL query string containing the event ID.
export default withRouter(EventPage);

EventPage.propTypes = {
  router: PropTypes.object,
};
