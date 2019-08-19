/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContainer } from './styled/StyledMap';

// bingmap setup function, initiates map and directrions, locations for route passed as argument.
const setMap = locations => {
  // initiates map object.
  const map = Microsoft.Maps.Map('#myMap');

  // gets user agents geolocation position.
  navigator.geolocation.getCurrentPosition(function(position) {
    const loc = new Microsoft.Maps.Location(
      position.coords.latitude,
      position.coords.longitude
    );

    // sets map default view and draws pin at user location.
    const pin = new Microsoft.Maps.Pushpin(loc);
    map.entities.push(pin);
    map.setView({
      center: loc,
      zoom: 12,
    });
  });

  // initiates the bing map directions manager module.
  Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
    const directionsManager = new Microsoft.Maps.Directions.DirectionsManager(
      map
    );

    // disablbes route dragging making route fixed to locations provided.
    directionsManager.setRequestOptions({
      routeDraggable: false,
    });

    // if locations provided, map over locations and add location to directions manager waypoint list.
    if (locations.length > 0) {
      locations.map(location => {
        const waypoint = new Microsoft.Maps.Directions.Waypoint({
          address: location.description,
        });
        directionsManager.addWaypoint(waypoint);
        return null;
      });
    }

    // provides a container id to inter the auto generated route itenerary.
    directionsManager.setRenderOptions({
      itineraryContainer: '#directionsItinerary',
    });

    // tells directions manager to calcuate a route from the waypoints provided.
    directionsManager.calculateDirections();
  });
};

// bing maps component, renders map on page, takes locations as argument.
const Map = ({ locations }) => {
  // map re-renders each time the locations array changes.
  useEffect(() => {
    setMap(locations);
  }, [locations]);

  return <MapContainer id="myMap" />;
};

export default Map;

Map.propTypes = {
  locations: PropTypes.array,
};
