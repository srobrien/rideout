import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import debounce from 'lodash.debounce';
import uniqueId from 'lodash.uniqueid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { PROXY } from '../config';
import { TextInput, Highlight, Bar, Label } from './styled/StyledForm';
import { DropDown, DropDownItem, SearchStyles } from './styled/StyledDropDown';

// provides an autocomplete dropdown that queries Google Places API.
// selectedLocations and function to set these from the addevent component.
const AutoComplete = ({ selectedLocations, setSelectedLocations }) => {
  const [locations, setLocations] = useState([]); // sets up empty array to hold locations.
  const [loaded, setLoaded] = useState(false); // sets up component loaded status, defaut false.

  useEffect(() => {
    setLoaded(true);
    return function cleanUp() {
      setLoaded(false);
    };
  }, [loaded]); // use effect will update loaded to true once component has been mounted.

  // function takes an entry from the search bar and queries Google for matching results.
  const handleOnChange = debounce(async evt => {
    const google = `${PROXY}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
      evt.target.value
    }&types=geocode&language=en&key=${process.env.GOOGLE_KEY}`;
    evt.persist();
    const res = await axios.get(google); // api call with constructed URL.

    if (res.status === 200) {
      setLocations(res.data.predictions);
    } // puts result of api call into locations array.
  }, 350); // debounce throttles network requests to every 350ms.

  const itemToString = item => (item ? item.description : ''); // function takes a location object and returns its description.

  const handleSelectItem = (item, state) => {
    if (item !== null) {
      const newItem = {
        id: uniqueId('placeId'),
        description: item.description,
      };
      const updatedLocations = [...selectedLocations, newItem];
      setSelectedLocations(updatedLocations);
      state.clearSelection();
    }
  }; // when item is selected the parents selectedLocations state is updated.

  if (!loaded) {
    return null;
  }

  return (
    <SearchStyles>
      <Downshift
        itemToString={itemToString}
        onChange={(item, state) => handleSelectItem(item, state)}
      >
        {({
          getInputProps,
          getMenuProps,
          getItemProps,
          isOpen,
          highlightedIndex,
        }) => (
          <div className="auto-complete" style={{ zIndex: 0 }}>
            <TextInput
              {...getInputProps({
                type: 'search',
                placeholder: '',
                id: 'search',
                onChange: e => {
                  e.persist();
                  handleOnChange(e);
                },
              })}
            />
            <Highlight />
            <Bar />
            <Label>
              <i className="fas fa-search" /> Add Location
            </Label>
            <DropDown {...getMenuProps()}>
              {isOpen
                ? locations.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({
                        item,
                        key: uniqueId(),
                      })}
                      highlighted={index === highlightedIndex}
                    >
                      {item.description}
                    </DropDownItem>
                  ))
                : null}
            </DropDown>
          </div>
        )}
      </Downshift>
    </SearchStyles>
  );
};

AutoComplete.propTypes = {
  selectedLocations: PropTypes.array,
  setSelectedLocations: PropTypes.func,
};

export default AutoComplete;
