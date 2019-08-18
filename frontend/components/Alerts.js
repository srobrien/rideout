import React from 'react';
import PropTypes from 'prop-types';
import { AlertStyles } from './styled/StyledAlerts';

// takes an error message passed in to it and formats it according to its status.
const Error = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <AlertStyles key={i} bg="#f2dede" text="#a94442" border="#ebccd1">
        <p data-test="graphql-error">
          <strong>Oops! </strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </AlertStyles>
    ));
  }
  return (
    <AlertStyles bg="#f2dede" text="#a94442" border="#ebccd1">
      <p data-test="graphql-error">
        <strong>Oops! </strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </AlertStyles>
  );
};

Error.defaultProps = {
  error: {},
};

Error.propTypes = {
  error: PropTypes.object,
};

const Success = ({ msg }) => (
  <AlertStyles
    width="90%"
    mb="5px"
    bg="#dff0d8"
    text="#3c763d"
    border="#d6e9c6"
  >
    <p data-test="graphql-error">
      <strong>Woo! </strong>
      {msg}
    </p>
  </AlertStyles>
);

Success.defaultProps = {
  msg: 'Nothing to see here',
};

Success.propTypes = {
  msg: PropTypes.string,
};

export { Error, Success };
