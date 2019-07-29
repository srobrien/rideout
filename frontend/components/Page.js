import React, { Component } from 'react';
import CookieConsent from 'react-cookie-consent';
import propTypes from 'prop-types';
import Link from 'next/link';
import Meta from './Meta';
import Auth from './context/Auth';

const MainApp = ({ children }) => (
  <>
    <Meta />
    <CookieConsent
      location="bottom"
      buttonText="I ACCEPT"
      cookieName="cookie-consent"
      style={{ background: 'rgba(138, 138, 138, 0.7)', fontSize: '14px' }}
      buttonStyle={{
        background: '#4a89dc',
        color: '#ffffff',
        fontSize: '13px',
      }}
    >
      RideOut uses cookies and other technologies to store and collect user data
      from your device, so that we can give you the best experience.
      <br />
      Control how cookies are used, and view more info in our{' '}
      <Link href="/policy">
        <a>Cookie Policy</a>
      </Link>
    </CookieConsent>
    <Auth>{children}</Auth>
  </>
);

MainApp.propTypes = {
  children: propTypes.element,
};

export default MainApp;
