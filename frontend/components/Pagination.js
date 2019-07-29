import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { PAGINATION_QUERY } from '../graphql/Query';
import { EVENTS_PER_PAGE } from '../config';
import {
  PaginationContainer,
  PaginationStyles,
  PaginationButton,
  PageText,
} from './styled/StyledPagination';

const Pagination = ({ page }) => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) {
        return <h1>loading...</h1>;
      }
      const totalItems = data.eventsConnection.aggregate.count;
      const pages = Math.ceil(totalItems / EVENTS_PER_PAGE);

      return (
        <PaginationContainer>
          <PaginationStyles>
            <PaginationButton>
              <Link
                prefetch
                href={{ pathname: '/', query: { page: page - 1 } }}
              >
                <a aria-disabled={page <= 1}>
                  <i className="far fa-caret-square-left fa-2x" />
                </a>
              </Link>
            </PaginationButton>

            <PageText>
              <p>
                Page {page} of {pages}
              </p>
            </PageText>
            <PaginationButton>
              <Link
                prefetch
                href={{ pathname: '/', query: { page: page + 1 } }}
              >
                <a aria-disabled={page >= pages}>
                  <i className="far fa-caret-square-right fa-2x" />
                </a>
              </Link>
            </PaginationButton>
          </PaginationStyles>
        </PaginationContainer>
      );
    }}
  </Query>
);

Pagination.propTypes = {
  page: PropTypes.number,
};

export default Pagination;
