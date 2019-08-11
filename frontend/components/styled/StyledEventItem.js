import styled from 'styled-components';
import { SubmitButton } from './StyledForm';

export const EventContainer = styled.div`
  @media (max-width: 500px) {
    grid-template: 'eventtitle eventtitle' 0.4fr 'details details' 1fr 'dateinfo dateinfo' 1fr 'attendees attendees' 0.8fr 'description button' 1.5fr / 4fr 1.2fr;
  }
  @media (max-width: 830px) {
    margin: 30px 0 0 0;
  }

  display: grid;
  grid-template-columns: 4fr 1.2fr;
  grid-template-rows: 1fr 2fr 1fr 1.5fr 3fr;
  grid-template-areas: 'eventtitle eventtitle' 'details details' 'dateinfo dateinfo' 'attendees attendees' 'description button';
  background: #f9f9f9f9;
  margin: 30px 30px 0 0;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;

export const EventTitle = styled.div`
  grid-area: eventtitle;
  background: #4a89dc;
  border-bottom: 2px solid #3160b6;
  h1 {
    color: #ffffff;
    margin: 5px 5px 5px 5px;
    font-size: 1.3rem;
  }
`;

export const Details = styled.div`
  grid-area: details;
  display: flex;
  flex-wrap: nowrap;
  padding: 10px 5px 5px 10px;
  white-space: nowrap;
  h4 {
    color: #111111;
    margin-left: 10px;
    white-space: nowrap;
  }
`;

export const DateInfo = styled.div`
  grid-area: dateinfo;
  display: grid;
  grid-template-columns: repeat(3, min-content);
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  padding: 5px;

  h4 {
    white-space: nowrap;
    color: #111111;
    margin: 0 20px 0 3px;
  }
  i {
    margin: 0 0 0 5px;
    color: #111111;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0 0 8px 0;
`;

export const Attendees = styled.div`
  grid-area: attendees;
  display: flex;
  align-items: center;
  background: #e3e6e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16), 0 1px 3px rgba(0, 0, 0, 0.23);
  h4 {
    color: #111111;
    margin: 0 0 0 5px;
  }
`;

export const Description = styled.div`
  grid-area: description;
  padding: 5px;
  p {
    color: #111111;
    font-weight: 100;
  }
`;

export const ViewButtonContainer = styled.div`
  grid-area: button;
  display: grid;
  align-items: flex-end;
  grid-template-rows: 1fr 1fr;
  padding: 10px;
`;

export const ViewButton = styled(SubmitButton)`
  margin: 0;
`;
