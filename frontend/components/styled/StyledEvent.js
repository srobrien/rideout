import styled from 'styled-components';
import { SubmitButton } from './StyledForm';

export const PageContainer = styled.div`
  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, min-content) auto;
    grid-template-areas: 'Details' 'Attendees' 'MapContainer' 'DirectionsContainer' 'Chat';
    grid-row-gap: 20px;
  }
  margin-top: 20px;
  height: 100%;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: repeat(2, min-content) auto;
  grid-template-areas: 'Chat Details' 'Chat Attendees' 'MapContainer DirectionsContainer ';
  padding: 1rem;
  overflow: hidden;
  grid-gap: 20px;
`;

export const MapContainer = styled.div`
  grid-area: MapContainer;
`;

export const Details = styled.div`
  grid-area: Details;
`;

export const DirectionsContainer = styled.div`
  grid-area: DirectionsContainer;
`;

export const Directions = styled.div`
  overflow-y: scroll;
`;

export const Attendees = styled.div`
  grid-area: Attendees;
  @media screen and (max-width: 820px) {
    min-height: 0;
  }
  min-height: 200px;
  max-height: 300px;

  h4 {
    margin: 0 0 60px 0;
    color: #111111;
  }
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
  max-height: ${props => props.height || null};
  overflow-y: scroll;
`;

export const DetailSet = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2px 0 2px 0;
  h4 {
    margin: 0 0 10px 0;
  }
`;

export const DetailImage = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
  h4 {
    margin-left: 5px;
  }
`;

export const DetailsDescription = styled.div`
  h4 {
    margin: 2px 0 2px 0;
  }
  max-height: 202px;
  overflow-y: scroll;
`;

export const Box = styled.div`
  width: 100%;
  > div {
    > div {
      width: 100% !important;
    }
  }
`;

export const AddButton = styled(SubmitButton)`
  margin-top: 20px;
`;

export const ButtonContainer = styled.div`
  display: grid;
  flex-grow: 1;
  grid-template-columns: 2fr 1fr;
  margin: 0 0 5px 0;
`;

export const StyledJoinButton = styled(SubmitButton)`
  margin: 0;
  grid-column-start: ${props => props.grid};
  background: ${props => (props.joined ? '#ea7d28' : '#36a759')};
  border-bottom: 2px solid ${props => (props.joined ? '#a7650a' : '#24733d')};
  text-shadow: 1px 1px 0 rgba(37, 109, 60, 0.5);
  &:hover {
    background: ${props => (props.joined ? '#a7650a' : '#24733d')};
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    color: #111111;
    margin-right: 10px;
  }
`;

export const AttendeeListContainer = styled.div`
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, 150px);
  align-items: stretch;
`;

export const AttendeeListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 15px 5px;
  h4 {
    white-space: nowrap;
    margin: 0 0 3px 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
