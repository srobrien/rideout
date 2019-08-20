import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import formatDate from '../lib/formattedDate';
import { AuthContext } from './context/Auth';
import { GET_SINGLE_EVENT } from '../graphql/Query';
import isEventLeader from '../lib/isEventLeader';
import { Loader, LoaderContainer } from './styled/StyledLoader';
import AppLayout from './AppLayout';
import Map from './Map';
import JoinButton from './JoinButton';
import EditButton from './EditButton';
import Chat from './Chat';
import {
  PageContainer,
  Title,
  MapContainer,
  Card,
  Details,
  DirectionsContainer,
  Directions,
  Box,
  DetailsContainer,
  DetailSet,
  DetailImage,
  DetailsDescription,
  Attendees,
  AttendeeListContainer,
  AttendeeListItem,
} from './styled/StyledEvent';

// displays an event when accessed via link on main page, takes event ID as argument.
const SingleEvent = ({ id }) => {
  // gets event from database
  const { data, loading } = useQuery(GET_SINGLE_EVENT, {
    variables: { id },
  });

  // checks if there is a user logged in.
  const user = useContext(AuthContext);
  if (!user) {
    return null;
  }

  // show spinner if request ongoing.
  if (loading) {
    return (
      <AppLayout>
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      </AppLayout>
    );
  }

  if (data) {
    // destructure event variables from database response.
    const {
      id: eventId,
      title,
      description,
      locations,
      startDate,
      leader,
      attendees,
    } = data.event;
    // checks if current user is the event leader.
    const eventLeader = isEventLeader(user.id, leader.id);
    // format date / time so it is suitable to display on page.
    const { date, time } = formatDate(startDate, 'ddd Do MMMM YYYY');
    let startLocation = '';
    let endLocation = '';
    if (locations.length > 0) {
      startLocation = locations[0].description;
      endLocation = locations[locations.length - 1].description;
    }
    // display event details
    return (
      <AppLayout>
        <PageContainer>
          <MapContainer>
            <Title>
              <h1>Interactive Map</h1>
            </Title>
            <Map locations={locations} />
          </MapContainer>

          <Chat id={eventId} />

          <Details>
            <Title>
              <h1>{title}</h1>
            </Title>
            <Card>
              <DetailsContainer>
                <DetailsDescription>
                  <h4>{description}</h4>
                </DetailsDescription>
                <DetailImage>
                  <img
                    src={leader.photo}
                    alt={leader.firstName}
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                    }}
                  />
                  <h4>
                    {`${leader.firstName} ${leader.lastName}`}: Event Leader
                  </h4>
                </DetailImage>
                <DetailSet>
                  <i
                    className="far fa-calendar-alt"
                    style={{ color: '#111111', marginRight: '3px' }}
                  />
                  <h4>{date}</h4>

                  <i
                    className="far fa-clock"
                    style={{ color: '#111111', marginRight: '3px' }}
                  />
                  <h4>{time}</h4>
                </DetailSet>
                <DetailSet>
                  <i
                    className="fas fa-map-marker-alt"
                    style={{ color: '#111111', marginRight: '3px' }}
                  />
                  <h4>{startLocation}</h4>
                </DetailSet>
                <DetailSet>
                  <i
                    className="fas fa-flag-checkered"
                    style={{ color: '#111111', marginRight: '3px' }}
                  />
                  <h4>{endLocation}</h4>
                </DetailSet>
                {!eventLeader && (
                  <JoinButton id={id} attendees={attendees} grid="2">
                    Join Event
                  </JoinButton>
                )}
                {eventLeader && (
                  <EditButton id={id} grid="2">
                    Edit Event
                  </EditButton>
                )}
              </DetailsContainer>
            </Card>
          </Details>

          <DirectionsContainer>
            <Title>
              <h1>Route Directions</h1>
            </Title>
            <Card height="400px">
              <Directions>
                <Box id="directionsItinerary" />
              </Directions>
            </Card>
          </DirectionsContainer>

          <Attendees>
            <Title>
              <h1>Rideout Attendees - {attendees.length} Members</h1>
            </Title>
            <Card>
              <AttendeeListContainer>
                {attendees.length === 0 && <h4>No Members Yet!</h4>}
                {attendees.map(attendee => (
                  <AttendeeListItem key={attendee.id}>
                    <img
                      src={attendee.photo}
                      alt={attendee.firstName}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                      }}
                    />
                    <h4>
                      {attendee.firstName} {attendee.lastName}
                    </h4>
                  </AttendeeListItem>
                ))}
              </AttendeeListContainer>
            </Card>
          </Attendees>
        </PageContainer>
      </AppLayout>
    );
  }
};

export default SingleEvent;

SingleEvent.propTypes = {
  id: PropTypes.string,
};
