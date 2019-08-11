import styled from 'styled-components';

export const Container = styled.div`
  @media (max-width: 830px) {
    grid-template-columns: 0.1fr 4fr 0.1fr;
    grid-template-areas: 'LSpacer SearchContainer RSpacer' 'LSpacer Events RSpacer';
  }
  display: grid;
  grid-template-columns: 0.25fr 2fr 1fr 0.25fr;
  grid-template-rows: min-content auto;
  grid-template-areas: 'LSpacer SearchContainer null RSpacer' 'LSpacer Events RightContainer RSpacer';
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
