import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
// import Pagination from './Pagination';
import { EventContainer } from './styled/StyledEventsHomePage';

export default class EventListing extends Component {
  render() {
    const { events } = this.props;
    const { page } = this.props;

    return (
      <EventContainer>
        {events.map(e => (
          <EventItem key={e.id} event={e} />
        ))}

        {/* <Pagination page={page} /> */}
      </EventContainer>
    );
  }
}

EventListing.propTypes = {
  page: PropTypes.number,
  events: PropTypes.array,
};
