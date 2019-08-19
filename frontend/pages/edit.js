import React, { useContext, useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import isEventLeader from '../lib/isEventLeader';
import { GET_SINGLE_EVENT } from '../graphql/Query';
import { AuthContext } from '../components/context/Auth';
import EditEvent from '../components/EditEvent';

const EventPage = ({ router }) => {
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

  const { data } = useQuery(GET_SINGLE_EVENT, {
    variables: { id: router.query.id },
  });

  if (data && user) {
    if (Object.values(data).length === 0) {
      return null;
    }

    const leaderId = data.event.leader.id || '';
    if (!isEventLeader(user.id, leaderId)) {
      Router.push('/');
      return null;
    }
    return <EditEvent event={data.event} />;
  }

  return null;
};

export default withRouter(EventPage);

EventPage.propTypes = {
  query: PropTypes.object,
};
