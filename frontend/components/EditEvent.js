import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { setDate } from 'date-fns';
import { CREATE_EVENT_MUTATION } from '../graphql/Mutation';
import {
  ALL_EVENTS_QUERY,
  FILTERED_EVENTS_QUERY,
  PAGINATION_QUERY,
} from '../graphql/Query';
import AutoComplete from './AutoComplete';
import Map from './Map';
import AppLayout from './AppLayout';
import { EVENTS_PER_PAGE } from '../config';
import DraggableList from './DraggableList';
import {
  FormGroup,
  TextInput,
  Highlight,
  Bar,
  Label,
  DTInput,
  DTLabel,
  Mobile,
  Desktop,
} from './styled/StyledForm';
import {
  Title,
  PageContainer,
  MapContainer,
  Itinerary,
  Card,
  Details,
  DirectionsContainer,
  Directions,
  Box,
  AddButton,
  ButtonContainer,
} from './styled/StyledAddEvent';
import { Loader, LoaderContainer } from './styled/StyledLoader';
import formatDate from '../lib/formattedDate';

const EditEvent = ({ event }) => {
  console.log(event);
  const { date, time } = formatDate(event.startDate, 'YYYY-MM-DD');
  console.log(date);
  console.log(time);
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [startDate, setStartDate] = useState(date);
  const [startTime, setStartTime] = useState(time);
  const [locations, setLocations] = useState(event.locations);
  const [dateColor, setDateColor] = useState('#636363');
  const [timeColor, setTimeColor] = useState('#636363');
  const [dateUsed, setDateUsed] = useState(true);
  const [timeUsed, setTimeUsed] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [sanitisedLocations, setSanitisedLocations] = useState([]);

  useEffect(() => {
    if (startDate !== '') {
      setDateUsed(true);
    }
  }, [startDate]);

  useEffect(() => {
    if (startTime !== '') {
      setTimeUsed(true);
    }
  }, [startTime]);

  useEffect(() => {
    setIsValid(
      title !== '' &&
        description !== '' &&
        startDate !== '' &&
        startTime !== '' &&
        locations.length > 0
    );
  }, [description, locations, startDate, startTime, title]);

  const getLocationDescriptions = async () => {
    const newLocations = locations.map(location => ({
      description: location.description,
    }));
    setSanitisedLocations(newLocations);
  };

  const [createEvent, { loading }] = useMutation(CREATE_EVENT_MUTATION, {
    variables: {
      title,
      description,
      startDate: `${startDate}T${startTime}`,
      locations: sanitisedLocations,
    },

    refetchQueries: [
      {
        query: FILTERED_EVENTS_QUERY,
        variables: { filter: '', skip: 1 * EVENTS_PER_PAGE - EVENTS_PER_PAGE },
      },
    ],
  });

  if (loading) {
    return (
      <AppLayout>
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <form
        method="post"
        onSubmit={async e => {
          e.preventDefault();
          await getLocationDescriptions();
          await createEvent().then(() => {
            Router.push('/');
          });
        }}
      >
        <PageContainer>
          <MapContainer>
            <Title>
              <h1>Interactive Map</h1>
            </Title>
            <Map locations={locations} />
            <ButtonContainer>
              <AddButton type="submit" disabled={isValid ? '' : 'disabled'}>
                Submit Changes
              </AddButton>
            </ButtonContainer>
          </MapContainer>

          <Details>
            <Title>
              <h1>Event Details</h1>
            </Title>
            <Card>
              <FormGroup>
                <TextInput
                  type="text"
                  className={title !== '' ? 'used' : ''}
                  onChange={e => {
                    setTitle(e.target.value);
                  }}
                  required
                  value={title}
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
              <Mobile>
                <FormGroup>
                  <DTLabel>Start Date / Time</DTLabel>
                  <DTInput
                    type="date"
                    onChange={e => {
                      setStartDate(e.target.value);
                    }}
                  />
                  <DTInput
                    type="time"
                    onChange={e => {
                      setStartTime(e.target.value);
                    }}
                  />
                </FormGroup>
              </Mobile>
              <Desktop>
                <FormGroup>
                  <TextInput
                    type="date"
                    className={dateUsed ? 'used' : ''}
                    color={dateColor}
                    onChange={e => {
                      setStartDate(e.target.value);
                    }}
                    onFocus={() => {
                      setDateColor('#636363');
                    }}
                    onBlur={() => {
                      if (startDate === '') {
                        setDateColor('transparent');
                      }
                    }}
                    required
                    value={startDate}
                  />
                  <Highlight />
                  <Bar />
                  <Label>Start Date</Label>
                </FormGroup>

                <FormGroup>
                  <TextInput
                    type="time"
                    className={timeUsed ? 'used' : ''}
                    color={timeColor}
                    onChange={e => {
                      setStartTime(e.target.value);
                    }}
                    onFocus={() => {
                      setTimeColor('#636363');
                    }}
                    onBlur={() => {
                      if (startTime === '') {
                        setTimeColor('transparent');
                      }
                    }}
                    required
                    value={startTime}
                  />
                  <Highlight />
                  <Bar />
                  <Label>Meeting Time</Label>
                </FormGroup>
              </Desktop>
            </Card>
          </Details>

          <Itinerary>
            <Title>
              <h1>Route Itinerary</h1>
            </Title>
            <Card>
              <AutoComplete
                selectedLocations={locations}
                setSelectedLocations={setLocations}
              />
              <DraggableList items={locations} setItems={setLocations} />
            </Card>
          </Itinerary>

          <DirectionsContainer>
            <Title>
              <h1>Route Directions</h1>
            </Title>
            <Directions>
              <Card>
                {locations.length > 1 && <Box id="directionsItinerary" />}
                {locations.length <= 1 && (
                  <h4>Locations required to calculate route</h4>
                )}
              </Card>
            </Directions>
          </DirectionsContainer>
        </PageContainer>
      </form>
    </AppLayout>
  );
};

export default EditEvent;
