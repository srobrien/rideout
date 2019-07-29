import React from 'react';
import PropTypes from 'prop-types';
import AppLayout from './AppLayout';
import Events from './Events';

const HomePage = ({ page }) => (
  <AppLayout>
    <Events page={page} />
  </AppLayout>
);

HomePage.propTypes = {
  page: PropTypes.number,
};

export default HomePage;
