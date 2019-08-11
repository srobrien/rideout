import styled from 'styled-components';

export const SearchContainer = styled.div`
  grid-area: SearchContainer;
  display: grid;
  grid-template-areas: 'SearchArea FilterBadgeArea';
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: ${props => (props.filter !== '' ? `1fr 1fr` : `1fr`)};
    grid-template-areas: ${props =>
      props.filter !== '' ? `'SearchArea' 'FilterBadgeArea'` : `'SearchArea'`};
  }
  grid-template-columns: max-content auto;
  grid-column-gap: 20px;
`;

export const SearchArea = styled.div`
  grid-area: SearchArea;
`;

export const FilterBadgeArea = styled.div`
  grid-area: FilterBadgeArea;
`;

export const SearchForm = styled.form`
  position: relative;
  width: 250px;
  height: 40px;
  border-radius: 40px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  background: #fff;
  transition: all 0.3s ease;

  input {
    position: absolute;
    top: 10px;
    left: 38px;
    font-size: 16px;
    background: none;
    color: #5a6674;
    width: 200px;
    height: 20px;
    border: none;
    appearance: none;
    outline: none;

    &::-webkit-search-cancel-button {
      appearance: none;
    }
  }

  button {
    position: absolute;
    top: 10px;
    left: 15px;
    height: 20px;
    width: 20px;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    outline: none !important;
    cursor: pointer;

    & svg {
      width: 20px;
      height: 20px;
      fill: #5a6674;
    }
  }
`;

export const FilteredBadge = styled.button`
  font-size: 0.75rem;
  text-transform: uppercase;
  background: #4a89dc;
  margin: 6px 0 0 0;
  border: none;
  padding: 8px;
  color: #fff;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  cursor: pointer;
  text-shadow: 1px 1px 0 rgba(39, 110, 204, 0.5);
  i {
    margin-right: 5px;
  }
  &:hover {
    background: #357bd8;
  }

  &:focus {
    outline: none;
  }
`;
