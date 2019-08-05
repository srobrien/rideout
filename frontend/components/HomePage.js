import React from 'react';
import PropTypes from 'prop-types';
import AppLayout from './AppLayout';
import Events from './Events';

const HomePage = () => (
  <AppLayout>
    <Events />
  </AppLayout>
);

export default HomePage;
