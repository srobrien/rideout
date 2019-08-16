import React, { useContext, useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import { AuthContext } from '../components/context/Auth';
import SingleEvent from '../components/SingleEvent';

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

  return <SingleEvent id={router.query.id} />;
};

export default withRouter(EventPage);

EventPage.propTypes = {
  router: PropTypes.object,
};
