import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import formatDate from '../lib/formattedDate';
import { AuthContext } from './context/Auth';
import { GET_SINGLE_EVENT } from '../graphql/Query';
import isEventLeader from '../lib/isEventLeader';
import { Loader } from './styled/StyledLoader';
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

const SingleEvent = ({ id }) => {
  const user = useContext(AuthContext);
  const { data, error, loading } = useQuery(GET_SINGLE_EVENT, {
    variables: { id },
  });

  if (loading) {
    return <Loader />;
  }

  if (data) {
    const {
      id: eventId,
      title,
      description,
      locations,
      startDate,
      leader,
      attendees,
    } = data.event;
    const eventLeader = isEventLeader(user.id, leader.id);
    const { date, time } = formatDate(startDate);

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
                  <h4>{locations[0].description}</h4>
                </DetailSet>
                <DetailSet>
                  <i
                    className="fas fa-flag-checkered"
                    style={{ color: '#111111', marginRight: '3px' }}
                  />
                  <h4>{locations[locations.length - 1].description}</h4>
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
            <Directions>
              <Card>
                <Box id="directionsItinerary" />
              </Card>
            </Directions>
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
