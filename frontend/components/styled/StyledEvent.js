import styled from 'styled-components';
import { SubmitButton } from './StyledForm';

export const PageContainer = styled.div`
  @media (max-width: 830px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, max-content);
    grid-template-areas: 'Details' 'Attendees' 'Directions' 'MapContainer' 'Chat';
  }
  padding: 0 25px 0 25px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-column-gap: 30px;
`;

export const Spacer = styled.div`
  grid-area: Spacer;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MapContainer = styled.div`
  grid-area: MapContainer;
  @media (max-width: 830px) {
    margin: 20px 0 0 0;
  }
  margin-bottom: 30px;
`;

export const Details = styled.div`
  @media (max-width: 830px) {
    margin-bottom: 0;
  }
  grid-area: Details;
  margin-bottom: 10px;
`;

export const DirectionsContainer = styled.div`
  @media (max-width: 830px) {
    margin-bottom: 0;
  }
  margin-bottom: 30px;
`;
export const Directions = styled.div`
  height: 400px;
  overflow: scroll;
`;

export const Attendees = styled.div`
  @media (max-width: 830px) {
    margin-bottom: 0;
  }
  grid-area: Attendees;
  margin-bottom: 30px;
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const AttendeeListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 15px 5px;
  h4 {
    margin: 0 0 3px 5px;
  }
`;
