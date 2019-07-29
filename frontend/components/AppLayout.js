import React from 'react';
import PropTypes from 'prop-types';
import MenuBar from './MenuBar';
import { LoggedInContainer } from './styled/StyledAuthentication';

const AppLayout = ({ children }) => (
  <LoggedInContainer>
    <MenuBar />
    {children}
  </LoggedInContainer>
);

AppLayout.propTypes = {
  children: PropTypes.element,
};

export default AppLayout;
