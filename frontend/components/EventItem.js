import React, { useContext } from 'react';
import Link from 'next/link';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import {
  EventContainer,
  EventTitle,
  Details,
  DateInfo,
  Attendees,
  Description,
  ViewButtonContainer,
  ViewButton,
} from './styled/StyledEventItem';
import JoinButton from './JoinButton';
import { AuthContext } from './context/Auth';

const EventItem = ({ event }) => {
  const user = useContext(AuthContext);
  const isEventLeader = event.leader.id === user.id;

  return (
    <EventContainer>
      <EventTitle>
        <h1>{event.title}</h1>
      </EventTitle>
      <Details>
        <img
          src={event.leader.photo || './static/user.jpg'}
          alt={event.leader.firstName || 'a user'}
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            boxShadow:
              '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
          }}
        />

        <h4>
          Group Leader: {event.leader.firstName} {event.leader.lastName}
        </h4>
      </Details>

      <DateInfo>
        <i className="far fa-calendar-alt" />
        <h4>{format(event.startDate, ' ddd Do MMMM YYYY')}</h4>
        <i className="far fa-clock" />
        <h4>{format(event.startDate, 'HH:mm')}</h4>
        <i className="fas fa-map-marker-alt" />
        <h4>{event.locations[0].description}</h4>
      </DateInfo>

      <Attendees>
        {event.attendees.length === 0 && <h4>No members yet!</h4>}
        {event.attendees.map(attendee => (
          <img
            key={attendee.id}
            src={attendee.photo ? attendee.photo : './static/user.jpg'}
            alt={attendee.firstName}
            style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              margin: '0 15px 0 5px',
              boxShadow:
                '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
            }}
          />
        ))}
      </Attendees>
      <Description>
        <p>{event.description}</p>
      </Description>
      <ViewButtonContainer>
        <JoinButton
          id={event.id}
          attendees={event.attendees}
          grid="span 2"
          leader={isEventLeader}
        />

        <Link href={{ pathname: '/event', query: { id: event.id } }}>
          <ViewButton type="button">View</ViewButton>
        </Link>
      </ViewButtonContainer>
    </EventContainer>
  );
};

export default EventItem;

EventItem.propTypes = {
  event: PropTypes.object,
};
