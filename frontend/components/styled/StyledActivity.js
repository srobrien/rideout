import styled from 'styled-components';

export const ActivityContainer = styled.div`
  @media (max-width: 830px) {
    display: none;
  }
  grid-area: 'Activity';
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 1fr;
  grid-template-areas: 'heading ' 'activities';
  background: #f9f9f9f9;
  height: 300px;
  width: 100%;
  margin: 30px 30px 0 0;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;

export const Heading = styled.div`
  grid-area: 'heading';
  background: #4a89dc;
  border-bottom: 2px solid #3160b6;
  h1 {
    color: #ffffff;
    margin: 5px 5px 5px 5px;
    font-size: 1.3rem;
  }
`;
export const Activites = styled.div`
  grid-area: 'activites';
  overflow-y: scroll;
  h4 {
    margin: 0;
    color: #111111;
  }
`;

export const LeadingEvents = styled.ul`
  padding: 0;
  margin: 0;
`;

export const Event = styled.li`
  list-style-type: none;
  display: flex;
  align-content: center;
  padding: 5px;
  margin: 0 0 2px 0;
  :hover {
    background: rgb(74, 137, 220, 0.6);
    cursor: pointer;
    h4 {
      color: #ffffff;
    }
  }
`;

export const Badge = styled.span`
  display: inline-block;
  background: ${props => props.color};
  color: #ffffff;
  padding: 2px;
  border-radius: 3px;
  margin-left: 10px;
  font-size: 0.65rem;
`;

export const AttendingEvents = styled.ul`
  padding: 0px;
  margin: 0;
`;
