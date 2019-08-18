import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from './context/Auth';
import {
  ActivityContainer,
  Heading,
  Activites,
  LeadingEvents,
  Event,
  AttendingEvents,
  Badge,
} from './styled/StyledActivity';

// gets all events for logged in user.
// displays them in a list with links and icons indicating if they are the event leader.

const Activity = () => {
  const { events, attending } = useContext(AuthContext);
  return (
    <ActivityContainer>
      <Heading>
        <h1>Your RideOuts</h1>
      </Heading>
      <Activites>
        <LeadingEvents>
          {events.length === 0 && attending.length === 0 && (
            <Event>
              <h4>No Current Events!</h4>
            </Event>
          )}
          {events.map(e => (
            <Link key={e.id} href={{ pathname: '/event', query: { id: e.id } }}>
              <Event>
                <h4>{e.title}</h4>
                <Badge color="#ff8716">LEADER</Badge>
              </Event>
            </Link>
          ))}
        </LeadingEvents>
        <AttendingEvents>
          {attending.map(e => (
            <Link key={e.id} href={{ pathname: '/event', query: { id: e.id } }}>
              <Event>
                <h4>{e.title}</h4>
              </Event>
            </Link>
          ))}
        </AttendingEvents>
      </Activites>
    </ActivityContainer>
  );
};

export default Activity;
