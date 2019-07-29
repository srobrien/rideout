/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContainer } from './styled/StyledMap';

const setMap = (locations, getWaypoints) => {
  const map = Microsoft.Maps.Map('#myMap');

  navigator.geolocation.getCurrentPosition(function(position) {
    const loc = new Microsoft.Maps.Location(
      position.coords.latitude,
      position.coords.longitude
    );

    const pin = new Microsoft.Maps.Pushpin(loc);
    map.entities.push(pin);
    map.setView({
      center: loc,
      zoom: 12,
    });
  });

  Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
    const directionsManager = new Microsoft.Maps.Directions.DirectionsManager(
      map
    );

    directionsManager.setRequestOptions({
      routeDraggable: false,
    });

    if (locations.length > 0) {
      locations.map(location => {
        const waypoint = new Microsoft.Maps.Directions.Waypoint({
          address: location.description,
        });
        directionsManager.addWaypoint(waypoint);
        return null;
      });
    }

    directionsManager.setRenderOptions({
      itineraryContainer: '#directionsItinerary',
    });

    directionsManager.calculateDirections();
    getWaypoints(directionsManager.getAllWaypoints());
  });
};

const Map = ({ locations }) => {
  const getWaypoints = waypoints => {};

  useEffect(() => {
    setMap(locations, getWaypoints);
  }, [locations]);

  return <MapContainer id="myMap" />;
};

export default Map;

Map.propTypes = {
  locations: PropTypes.array,
};
