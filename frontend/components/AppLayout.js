import React from 'react';
import PropTypes from 'prop-types';
import MenuBar from './MenuBar';
import { LoggedInContainer } from './styled/StyledAuthentication';

// provides a consistent container for any pages shown when the user is logged in.
// any elements between the AppLayout tag will be rendered as chid props.

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
