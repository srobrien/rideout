import styled from 'styled-components';
import { SubmitButton } from './StyledForm';

export const PageContainer = styled.div`
  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, min-content);
    grid-template-areas: 'Details' 'Itinerary' 'DirectionsContainer' 'MapContainer';
  }
  margin-top: 20px;
  height: 100%;
  display: grid;
  grid-template-columns: 1.5fr 1fr;

  grid-template-areas: 'MapContainer Details' 'MapContainer Itinerary' 'null DirectionsContainer ';
  padding: 1rem;
  overflow: hidden;
  grid-column-gap: 20px;
`;

export const MapContainer = styled.div`
  grid-area: MapContainer;
`;

export const Details = styled.div`
  grid-area: Details;
`;

export const DirectionsContainer = styled.div`
  grid-area: DirectionsContainer;
  @media screen and (max-width: 820px) {
    margin-top: 20px;
  }
`;

export const Itinerary = styled.div`
  grid-area: Itinerary;
`;

export const Directions = styled.div`
  max-height: 400px;
  overflow-y: scroll;
`;

export const Title = styled.div`
  padding-top: 1px;
  background: #4a89dc;
  border-bottom: 2px solid #3160b6;
  h1 {
    color: #ffffff;
    margin: 5px 5px 5px 5px;
    font-size: 1.3rem;
  }
`;

export const Card = styled.div`
  background-color: #f9f9f9;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  padding: 20px 5px 5px 5px;
  margin: 0 0 20px 0;
`;

export const Box = styled.div`
  width: 100%;
  > div {
    > div {
      width: 100% !important;
    }
  }
`;

export const AddButton = styled(SubmitButton)``;

export const ButtonContainer = styled.div`
  grid-area: ButtonContainer;
  @media screen and (max-width: 820px) {
    margin-top: 10px;
  }
`;
