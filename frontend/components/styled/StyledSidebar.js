import styled from 'styled-components';

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${props => (props.isOpen ? '0' : '-80%')};
  height: 100%;
  width: 80%;
  background: rgba(24, 40, 72, 0.8);
  z-index: 100;
  transition: all 0.4s ease-in-out;
  padding: 15px;
`;

export const SidebarContents = styled.div`
  display: flex;
  flex-direction: column;
  a {
    color: #fff;
    font-size: 1.4rem;
    text-decoration: none;
    font-weight: 200;
    margin-top: 10px;
    padding: 5px;
    :hover {
      background: #4a89dc;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h4 {
    font-size: 1.4rem;
    color: #ffffff;
    font-weight: 500;
    margin-left: 10px;
  }
`;
