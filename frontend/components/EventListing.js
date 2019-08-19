import React from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import { EventContainer } from './styled/StyledEventsHomePage';

// renders a list of event item cards on the events page.
const EventListing = ({ events }) => (
  <EventContainer>
    {events.map(e => (
      <EventItem key={e.id} event={e} />
    ))}
  </EventContainer>
);

export default EventListing;

EventListing.propTypes = {
  events: PropTypes.array,
};
