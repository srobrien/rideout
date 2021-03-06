import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchArea,
  SearchContainer,
  FilterBadgeArea,
  FilteredBadge,
} from './styled/StyledFilter';

// function to transform the first letter of the search term to match database entries.
const titleCase = str => {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i += 1) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

// filter search component for the events page. Takes filter and setFilter function from parent.
const Filter = ({ setFilter, filter }) => {
  const [filterTerm, setFilterTerm] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    setFilter(filterTerm);
    setFilterTerm('');
  }; // when filter form is submitted, input value sent to events filter query and seach box reset.
  return (
    <SearchContainer filter={filter}>
      <SearchArea>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0"
          height="0"
          display="none"
        >
          <symbol id="search" viewBox="0 0 32 32">
            <path d="M 19.5 3 C 14.26514 3 10 7.2651394 10 12.5 C 10 14.749977 10.810825 16.807458 12.125 18.4375 L 3.28125 27.28125 L 4.71875 28.71875 L 13.5625 19.875 C 15.192542 21.189175 17.250023 22 19.5 22 C 24.73486 22 29 17.73486 29 12.5 C 29 7.2651394 24.73486 3 19.5 3 z M 19.5 5 C 23.65398 5 27 8.3460198 27 12.5 C 27 16.65398 23.65398 20 19.5 20 C 15.34602 20 12 16.65398 12 12.5 C 12 8.3460198 15.34602 5 19.5 5 z" />
          </symbol>
        </svg>
        <SearchForm className="search-form" onSubmit={e => handleSubmit(e)}>
          <input
            type="search"
            value={filterTerm}
            onChange={e => setFilterTerm(titleCase(e.target.value))}
            placeholder="Filter by location"
            className="search-input"
          />
          <button type="submit" className="search-button">
            <svg className="submit-button">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="#search"
              />
            </svg>
          </button>
        </SearchForm>
      </SearchArea>
      <FilterBadgeArea>
        {filter && (
          <FilteredBadge onClick={() => setFilter('')}>
            <i className="fas fa-times" />
            {filter}
          </FilteredBadge>
        )}
      </FilterBadgeArea>
    </SearchContainer>
  );
};

export default Filter;

Filter.propTypes = {
  setFilter: PropTypes.func,
  filter: PropTypes.string,
};
