import styled from 'styled-components';

export const Container = styled.div`
  @media (max-width: 830px) {
    grid-template-columns: 0.1fr 4fr 0.1fr;
    grid-template-areas: 'LSpacer SearchBar RSpacer' 'LSpacer Events RSpacer';
  }
  display: grid;
  grid-template-columns: 0.25fr 2fr 1fr 0.25fr;
  grid-template-rows: 50px auto;
  grid-template-areas: 'LSpacer SearchBar SearchBar RSpacer' 'LSpacer Events RightContainer RSpacer';
`;

export const LSpacer = styled.div`
  grid-area: LSpacer;
`;

export const RSpacer = styled.div`
  grid-area: RSpacer;
`;

export const EventContainer = styled.div`
  grid-area: Events;
`;

export const Right = styled.div`
  grid-area: RightContainer;
`;

export const SearchBar = styled.div`
  grid-area: SearchBar;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

export const FilteredBadge = styled.button`
  font-size: 0.75rem;
  text-transform: uppercase;
  background: #4a89dc;
  margin: 6px 0 0 20px;
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
