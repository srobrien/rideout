import React, { useContext } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_EVENT_MUTATION } from '../graphql/Mutation';
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

const event = {
  id: '123',
  title: 'hi',
  description: 'hi again',
  locations: [],
  startDate: '2019-01-01',
};

const Activity = () => {
  const [updateEvent] = useMutation(UPDATE_EVENT_MUTATION, {
    variables: event,
  });
  const { events, attending } = useContext(AuthContext);
  return (
    <ActivityContainer>
      <button onClick={() => updateEvent()} />
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
