import React, { useState, useEffect } from 'react';
import Downshift, { clearItems } from 'downshift';
import debounce from 'lodash.debounce';
import uniqueId from 'lodash.uniqueid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { PROXY } from '../config';
import { TextInput, Highlight, Bar, Label } from './styled/StyledForm';
import { DropDown, DropDownItem, SearchStyles } from './styled/StyledDropDown';

const AutoComplete = ({ selectedLocations, setSelectedLocations }) => {
  const [locations, setLocations] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    return function cleanUp() {
      setLoaded(false);
    };
  }, [loaded]);

  const handleOnChange = debounce(async evt => {
    const google = `${PROXY}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
      evt.target.value
    }&types=geocode&language=en&key=${process.env.GOOGLE_KEY}`;
    evt.persist();
    const res = await axios.get(google);

    if (res.status === 200) {
      setLocations(res.data.predictions);
    }
  }, 350);

  const itemToString = item => (item ? item.description : '');

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
  };

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
          clearItems,
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
