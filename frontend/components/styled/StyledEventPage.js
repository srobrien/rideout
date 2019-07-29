import styled from 'styled-components';

export const EventFormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.2fr 1fr 1fr;
  grid-template-areas: 'Title Content' 'Map Content' 'Map Content';
  grid-column-gap: 5%;
`;

export const StyledFormContainer = styled.div`
  display: grid;
  margin-top: 30px;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.08fr 1fr;
  grid-template-areas: 'Header Header' 'Form Form';
`;

export const Header = styled.div`
  grid-area: Header;
  width: 90%;
  background: #4a89dc;
  border-bottom: 2px solid #3160b6;
  h1 {
    color: #ffffff;
    margin: 5px 5px 5px 5px;
  }
`;

export const Title = styled.div`
  grid-area: Title;
  height: 60px;
`;

export const Buttons = styled.div`
  grid-area: Buttons;
`;

export const MapStyles = styled.div`
  grid-area: Map;
`;

export const Content = styled.div`
  grid-area: Content;
`;

export const Itinerary = styled.div`
  grid-area: Itinerary;
`;

export const Description = styled.div`
  grid-area: Description;
`;

export const Chat = styled.div`
  grid-area: Chat;
`;
