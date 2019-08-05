import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NEW_EVENT } from '../graphql/Subscription';
import EventItem from './EventItem';
import Pagination from './Pagination';
import { EventContainer } from './styled/StyledEventsHomePage';

export default class EventListing extends Component {
  componentDidMount() {
    const { subscribeToMore } = this.props;
    subscribeToMore({
      document: NEW_EVENT,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.newEvent) {
          return prev;
        }
        console.log(subscriptionData.data.newEvent);
        return {
          events: [subscriptionData.data.newEvent, ...prev.events],
        };
      },
    });
  }

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
  subscribeToMore: PropTypes.func,
};
