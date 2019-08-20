import React, { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import formatDate from '../lib/formattedDate';
import isEventLeader from '../lib/isEventLeader';
import {
  EventContainer,
  EventTitle,
  Details,
  DateInfo,
  Attendees,
  Description,
  ViewButtonContainer,
  ViewButton,
  InfoItem,
} from './styled/StyledEventItem';
import JoinButton from './JoinButton';
import { AuthContext } from './context/Auth';

// component renders a overview card of event in the events page event list, takes the event as an argument.
const EventItem = ({ event }) => {
  // get logged in user and verify user exists.
  const user = useContext(AuthContext);
  if (!user) {
    return null;
  }

  // checks if user is the event leader.
  const eventLeader = isEventLeader(event.leader.id, user.id);

  // destructure event variables to use in component.
  const {
    id,
    title,
    leader,
    startDate,
    locations,
    attendees,
    description,
  } = event;

  // format time for display use.
  const { date, time } = formatDate(startDate, 'ddd Do MMMM YYYY');

  const createExcerpt = (text, length) => {
    const arr = text.split(' ');
    const tails = arr.length - 1 > length;
    const spliced = arr.splice(0, length);
    if (tails) {
      spliced.push('...');
    }
    return spliced.join(' ');
  };

  return (
    <EventContainer>
      <EventTitle>
        <h1>{title}</h1>
      </EventTitle>
      <Details>
        <img
          src={leader.photo || './static/user.jpg'}
          alt={leader.firstName || 'a user'}
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            boxShadow:
              '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
          }}
        />

        <h4>
          Group Leader: {leader.firstName} {leader.lastName}
        </h4>
      </Details>

      <DateInfo>
        <InfoItem>
          <i className="far fa-calendar-alt" />
          <h4>{date}</h4>
        </InfoItem>
        <InfoItem>
          <i className="far fa-clock" />
          <h4>{time}</h4>
        </InfoItem>
        <InfoItem>
          <i className="fas fa-map-marker-alt" />
          <h4>{locations[0].description}</h4>
        </InfoItem>
      </DateInfo>

      <Attendees>
        {attendees.length === 0 && <h4>No members yet!</h4>}
        {attendees.map(attendee => (
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
        <p>{createExcerpt(description, 50)}</p>
      </Description>
      <ViewButtonContainer>
        <JoinButton
          id={id}
          attendees={attendees}
          grid="span 2"
          leader={eventLeader}
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
