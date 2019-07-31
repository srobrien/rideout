import styled from 'styled-components';
import PropTypes from 'prop-types';

const Burger = styled.div`
  display: inline-block;
  width: 35px;
  height: 30px;
  margin: 14px 0 0 0;
  position: relative;
  cursor: pointer;

  span {
    background-color: #fff;
    position: absolute;
    border-radius: 2px;
    transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
    width: 100%;
    height: 4px;
    transition-duration: 500ms;
  }
  span:nth-child(1) {
    top: 0px;
    left: 0px;
  }
  span:nth-child(2) {
    top: 13px;
    left: 0px;
    opacity: 1;
  }
  span:nth-child(3) {
    bottom: 0px;
    left: 0px;
  }

  span:nth-child(1) {
    transform: ${props => (props.isOpen ? 'rotate(45deg)' : null)};
    top: ${props => (props.isOpen ? '13px' : null)};
  }
  span:nth-child(2) {
    ${props => (props.isOpen ? 'opacity: 0' : null)};
  }
  span:nth-child(3) {
    transform: ${props => (props.isOpen ? 'rotate(-45deg)' : null)};
    top: ${props => (props.isOpen ? '13px' : null)};
  }
`;

const StyledBurger = ({ isOpen, setIsOpen }) => (
  <Burger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
    <span />
    <span />
    <span />
  </Burger>
);

export default StyledBurger;

StyledBurger.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
