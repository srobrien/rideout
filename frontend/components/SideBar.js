import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {
  SidebarContainer,
  SidebarContents,
  UserInfo,
} from './styled/StyledSidebar';
import LogOut from './LogOut';

const SideBar = ({ isOpen, user }) => (
  <SidebarContainer isOpen={isOpen}>
    <SidebarContents>
      <UserInfo>
        <img
          src={user.photo}
          alt={user.firstName}
          style={{ borderRadius: '50%', height: '40px', width: '40px' }}
        />
        <h4>
          {user.firstName} {user.lastName}
        </h4>
      </UserInfo>
      <Link href="/">
        <a>RideOuts</a>
      </Link>
      <Link href="/addevent">
        <a>New Event</a>
      </Link>
      <Link href="/useradmin">
        <a>My Account</a>
      </Link>
      <LogOut side />
    </SidebarContents>
  </SidebarContainer>
);

export default SideBar;

SideBar.propTypes = {
  isOpen: PropTypes.bool,
  user: PropTypes.object,
};
