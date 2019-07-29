import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
`;

const DropDownItem = styled.div`
  border-right: 1px solid #757575;
  border-bottom: 1px solid #757575;
  color: #999;
  background: ${props => (props.highlighted ? '#f7f7f7' : '#fafafa')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: ${props =>
    props.highlighted ? '10px solid #4a89dc' : '1px solid #757575'};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export { DropDown, DropDownItem, SearchStyles };
