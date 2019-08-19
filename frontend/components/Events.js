import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'next/router';
import { FILTERED_EVENTS_QUERY } from '../graphql/Query';
import { EVENTS_PER_PAGE } from '../config';
import Activity from './Activity';
import EventListing from './EventListing';
import { Loader, LoaderContainer } from './styled/StyledLoader';
import {
  Container,
  LSpacer,
  RSpacer,
  Right,
} from './styled/StyledEventsHomePage';
import Filter from './Filter';

// this is the main component used to display the layout on the events
const Events = ({ page }) => {
  const [filter, setFilter] = useState('');
  const { data, loading } = useQuery(FILTERED_EVENTS_QUERY, {
    variables: { filter },
    notifyOnNetworkStatusChange: true,
  }); // queries database for all events, or event by filter if it is provided.

  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <Container>
      <LSpacer />
      <Filter filter={filter} setFilter={setFilter} />
      <EventListing events={data.events || []} page={page} />
      <Right>
        <Activity />
      </Right>
      <RSpacer />
    </Container>
  );
};

Events.propTypes = {
  page: PropTypes.number,
};

export default withRouter(Events);
