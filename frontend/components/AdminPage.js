import React from 'react';
import PropTypes from 'prop-types';
import UserDetails from './UserDetails';
import AppLayout from './AppLayout';

const AdminPage = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <AppLayout>
      <UserDetails />
    </AppLayout>
  );
};

AdminPage.propTypes = {
  user: PropTypes.object,
};

export default AdminPage;
