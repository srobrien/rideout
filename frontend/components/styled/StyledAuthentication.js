import styled from 'styled-components';

export const LoggedOutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('./static/background.jpg');
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

export const LoggedInContainer = styled.div`
  background: #4b6cb7;
  background: -webkit-linear-gradient(to top, #4b6cb7, #182848);
  background: linear-gradient(to top, #4b6cb7, #182848);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  height: 100%;
`;

export const LogOutButton = styled.button`
  padding: ${props => (props.side ? '5px' : '0')};
  border: none;
  color: ${props => (props.side ? '#ffffff' : '#111111')};
  text-align: ${props => (props.side ? 'left' : 'center')};
  background-color: transparent;
  cursor: pointer;
  margin: 8px 0 0 0;
  font-weight: ${props => (props.side ? '300' : '400')};
  font-size: ${props => (props.side ? '1.4rem' : '1.2rem')};
  :hover {
    background: ${props => (props.side ? '#4a89dc' : 'lightgrey')};
    cursor: pointer;
  }
  i {
    margin-left: 10px;
  }
`;
