import styled from 'styled-components';

export const StyledMenuBar = styled.div`
  @media (max-width: 680px) {
    grid-template-areas: 'Logo Spacer MenuBurger';
  }
  display: grid;
  grid-template-columns: max-content auto min-content;
  grid-template-areas: 'Logo Spacer Menu';
  padding: 10px;
  z-index: 5;
  h3 {
    font-size: 1.2rem;
    color: #ffffff;
  }
  height: ${props => (props.scroll ? '65px' : '80px')};
  position: sticky;
  top: ${props => (props.scroll ? '-15px' : '0px')};
  background-color: ${props => (props.scroll ? 'rgb(74,137,220)' : null)};
  border-bottom: ${props => (props.scroll ? '2px solid #3160b6' : '0')};
  transition: all 0.5s ease-in-out;
`;

export const Logo = styled.div`
  @media (max-width: 680px) {
    margin: 10px 0 0 0;
  }
  grid-area: Logo;
  min-width: 180px;
  margin: 10px 0 0 34px;
  h1 {
    margin-top: 0;
    font-size: 2rem;
    color: #ffffff;
    font-weight: 300;
  }
  i {
    float: left;
    color: #ffffff;
    margin: 2px 5px 0 0;
  }
  a {
    text-decoration: none;
  }
`;

export const Spacer = styled.div`
  grid-area: Spacer;
`;

export const Menu = styled.div`
  @media (max-width: 680px) {
    display: none;
  }
  grid-area: Menu;
  display: flex;
  justify-content: space-around;
  margin-right: 30px;
  min-width: 300px;

  h3 {
    :hover {
      cursor: pointer;
      border-bottom: 1px solid white;
    }
  }
`;

export const DropMenu = styled.div`
  display: block;
  visibility: hidden;
  position: absolute;
  left: -100%;
  background-color: #f9f9f9;
  min-width: 140px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 12px 16px;
  z-index: 3;
  top: 50px;
  left: -50px;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 5px 0 0 0;
      font-size: 1.2rem;
      :hover {
        background: lightgray;
        cursor: pointer;
      }
      i {
        margin-left: 10px;
      }
    }
  }
`;

export const UserButton = styled.div`
  margin-top: 10px;
  position: relative;
  display: inline-block;

  :hover {
    cursor: pointer;
  }
  &:hover ${DropMenu} {
    display: block;
    visibility: visible;
    opacity: 1;
  }
`;

export const Triangle = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
  top: -8px;
  left: 50%;
  margin-left: -8px;
`;

export const MenuBurger = styled.div`
  grid-area: MenuBurger;
  display: none;
  @media (max-width: 680px) {
    display: block;
  }
`;
