import React, { useContext, useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import isEventLeader from '../lib/isEventLeader';
import { GET_SINGLE_EVENT } from '../graphql/Query';
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
  return (
    <Query query={GET_SINGLE_EVENT} variables={{ id: query.id }}>
      {({ data, loading }) => {
        if (data) {
          const leaderId = data.event.leader.id;
          const isLeader = isEventLeader(user.id, leaderId);
          return <div>{`${isLeader}`}</div>;
        }
      }}
    </Query>
  );
};

export default withRouter(EventPage);

EventPage.propTypes = {
  query: PropTypes.object,
};
