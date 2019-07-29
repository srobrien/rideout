import styled from 'styled-components';

export const LoggedOutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-bottom: 10px;
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
  padding-bottom: 30px;
  min-height: 100vh;
`;

export const LogOutButton = styled.button`
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  margin: 8px 0 0 0;
  font-size: 1.2rem;
  :hover {
    background: lightgray;
    cursor: pointer;
  }
  i {
    margin-left: 10px;
  }
`;
