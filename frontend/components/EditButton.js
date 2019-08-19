import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { StyledJoinButton, ButtonContainer } from './styled/StyledEvent';

// edit event button, updates style depending on screen / size.
const EditButton = ({ id, grid }) => (
  <ButtonContainer>
    <Link href={{ pathname: '/edit', query: { id } }}>
      <StyledJoinButton grid={grid}>Edit</StyledJoinButton>
    </Link>
  </ButtonContainer>
);

export default EditButton;

EditButton.propTypes = {
  id: PropTypes.string,
  grid: PropTypes.string,
};
