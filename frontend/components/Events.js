import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withRouter } from 'next/router';
import { ALL_EVENTS_QUERY, FILTERED_EVENTS_QUERY } from '../graphql/Query';
import { EVENTS_PER_PAGE } from '../config';
import Activity from './Activity';
import EventListing from './EventListing';
import { Loader } from './styled/StyledLoader';
import {
  Container,
  LSpacer,
  RSpacer,
  Right,
  SearchBar,
  FilteredBadge,
} from './styled/StyledEventsHomePage';
import Filter from './Filter';

const Events = ({ page }) => {
  const [filter, setFilter] = useState('');

  if (filter === '') {
    return (
      <Query
        query={ALL_EVENTS_QUERY}
        variables={{
          skip: page * EVENTS_PER_PAGE - EVENTS_PER_PAGE,
        }}
      >
        {({ data, loading, subscribeToMore }) => {
          if (loading) {
            return <Loader />;
          }

          return (
            <Container>
              <SearchBar>
                <Filter setFilter={setFilter} />
              </SearchBar>
              <LSpacer />

              <EventListing
                events={data.events || []}
                page={page}
                subscribeToMore={subscribeToMore}
              />

              <Right>
                <Activity />
              </Right>
              <RSpacer />
            </Container>
          );
        }}
      </Query>
    );
  }
  return (
    <Query
      query={FILTERED_EVENTS_QUERY}
      variables={{
        filter,
        skip: page * EVENTS_PER_PAGE - EVENTS_PER_PAGE,
      }}
    >
      {({ data, loading, subscribeToMore }) => {
        if (loading) {
          return <Loader />;
        }

        return (
          <Container>
            <SearchBar>
              <Filter setFilter={setFilter} />
              <div>
                {filter && (
                  <FilteredBadge onClick={() => setFilter('')}>
                    <i className="fas fa-times" />
                    {filter}
                  </FilteredBadge>
                )}
              </div>
            </SearchBar>

            <LSpacer />

            <EventListing
              events={data.events || []}
              page={page}
              subscribeToMore={subscribeToMore}
            />

            <Right>
              <Activity />
            </Right>
            <RSpacer />
          </Container>
        );
      }}
    </Query>
  );
};

Events.propTypes = {
  page: PropTypes.number,
};

export default withRouter(Events);
