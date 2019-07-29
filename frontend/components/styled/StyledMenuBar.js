import styled from 'styled-components';

export const StyledMenuBar = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 0.5fr 2fr 0.75fr 0.25fr;
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

export const Title = styled.div`
  min-width: 160px;
  margin-top: 10px;
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

export const ButtonSet = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 300px;
  h3 {
    :hover {
      cursor: pointer;
      border-bottom: 1px solid white;
    }
  }
`;

export const Spacer = styled.div``;

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

export const MenuButton = styled.button`
  display: inline-block;
  margin: 0 12px 0 0;
  background-color: ${props => props.bg};
  width: 35px;
  height: 35px;
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding-top: 2px;
  outline: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.2s ease-in-out;
  :hover {
    background-color: ${props => props.fg};
    i {
      color: ${props => props.bg};
    }
  }
  i {
    color: ${props => props.fg};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
