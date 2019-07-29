import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import { CREATE_EVENT_MUTATION } from '../graphql/Mutation';
import { ALL_EVENTS_QUERY, PAGINATION_QUERY } from '../graphql/Query';
import AutoComplete from './AutoComplete';
import Map from './Map';
import AppLayout from './AppLayout';
import DraggableList from './DraggableList';
import {
  FormGroup,
  TextInput,
  Highlight,
  Bar,
  Label,
} from './styled/StyledForm';
import {
  PageContainer,
  LeftBorder,
  Left,
  RightBorder,
  Right,
  Title,
  MapContainer,
  Card,
  Details,
  RouteList,
  Directions,
  Box,
  AddButton,
} from './styled/StyledEvent';
import { Loader } from './styled/StyledLoader';

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [locations, setLocations] = useState([]);
  const [color, setColor] = useState('transparent');
  const [dateUsed, setDateUsed] = useState('false');
  const [isValid, setIsValid] = useState(true);
  const [sanitisedLocations, setSanitisedLocations] = useState([]);

  useEffect(() => {
    if (startDate !== '') {
      setDateUsed(false);
    }
  }, [startDate]);

  useEffect(() => {
    setIsValid(
      title !== '' &&
        description !== '' &&
        startDate !== '' &&
        locations.length > 0
    );
  }, [description, locations, startDate, title]);

  const getLocationDescriptions = async () => {
    const newLocations = locations.map(location => ({
      description: location.description,
    }));
    setSanitisedLocations(newLocations);
  };

  return (
    <AppLayout menuTitle="Create A New Event">
      <Mutation
        mutation={CREATE_EVENT_MUTATION}
        refetchQueries={[
          { query: ALL_EVENTS_QUERY },
          { query: PAGINATION_QUERY },
        ]}
        variables={{
          title,
          description,
          startDate,
          locations: sanitisedLocations,
        }}
        onCompleted={() => Router.push('/')}
      >
        {(createEvent, { loading }) => {
          if (loading) {
            return <Loader />;
          }
          return (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await getLocationDescriptions();
                await createEvent();
              }}
            >
              <PageContainer>
                <LeftBorder />
                <Left>
                  <MapContainer>
                    <Title>
                      <h1>Interactive Map</h1>
                    </Title>
                    <Map locations={locations} />
                  </MapContainer>
                  <AddButton type="submit" disabled={isValid ? '' : 'disabled'}>
                    Submit New Event
                  </AddButton>
                </Left>
                <Right>
                  <Details>
                    <Title>
                      <h1>Event Details</h1>
                    </Title>
                    <Card>
                      <FormGroup>
                        <TextInput
                          type="text"
                          className={title !== '' ? 'used' : ''}
                          value={title}
                          onChange={e => {
                            setTitle(e.target.value);
                          }}
                          required
                        />
                        <Highlight />
                        <Bar />
                        <Label>Event Title</Label>
                      </FormGroup>
                      <FormGroup>
                        <TextInput
                          type="text"
                          className={description !== '' ? 'used' : ''}
                          value={description}
                          onChange={e => {
                            setDescription(e.target.value);
                          }}
                          required
                        />
                        <Highlight />
                        <Bar />
                        <Label>Brief Description</Label>
                      </FormGroup>
                      <FormGroup>
                        <TextInput
                          type="datetime-local"
                          className={dateUsed ? '' : 'used'}
                          color={color}
                          onChange={e => {
                            setStartDate(e.target.value);
                          }}
                          onFocus={() => {
                            setColor('#636363');
                          }}
                          onBlur={() => {
                            if (startDate === '') {
                              setColor('transparent');
                            }
                          }}
                          required
                          value={startDate}
                        />
                        <Highlight />
                        <Bar />
                        <Label>Start Date / Time</Label>
                      </FormGroup>
                    </Card>
                  </Details>
                  <RouteList>
                    <Title>
                      <h1>Route Itinerary</h1>
                    </Title>
                    <Card>
                      <AutoComplete
                        selectedLocations={locations}
                        setSelectedLocations={setLocations}
                      />
                      <DraggableList
                        items={locations}
                        setItems={setLocations}
                      />
                    </Card>
                  </RouteList>
                  <Directions>
                    <Title>
                      <h1>Route Directions</h1>
                    </Title>
                    <Card>
                      {locations.length > 1 && <Box id="directionsItinerary" />}
                      {locations.length <= 1 && (
                        <h4>Locations required to calculate route</h4>
                      )}
                    </Card>
                  </Directions>
                </Right>
                <RightBorder />
              </PageContainer>
            </form>
          );
        }}
      </Mutation>
    </AppLayout>
  );
};

export default AddEvent;
