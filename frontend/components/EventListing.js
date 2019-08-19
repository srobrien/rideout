import React from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import { EventContainer } from './styled/StyledEventsHomePage';

// renders a list of event item cards on the events page.
const EventListing = ({ events }) => {
  if (events.length === 0) {
    return (
      <EventContainer>
        <div
          style={{ height: '100vh', textAlign: 'center', paddingTop: '20px' }}
        >
          <h3 style={{ color: '#fff' }}>Sorry! No events found!</h3>
        </div>
      </EventContainer>
    );
  }
  return (
    <EventContainer>
      {events.map(e => (
        <EventItem key={e.id} event={e} />
      ))}
    </EventContainer>
  );
};

export default EventListing;

EventListing.propTypes = {
  events: PropTypes.array,
};
