import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { AuthContext } from './context/Auth';
import { GET_SINGLE_EVENT } from '../graphql/Query';
import { Loader } from './styled/StyledLoader';
import AppLayout from './AppLayout';
import Map from './Map';
import JoinButton from './JoinButton';
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
  FlexContainer,
} from './styled/StyledEvent';

const SingleEvent = ({ id }) => {
  const user = useContext(AuthContext);
  return (
    <Query query={GET_SINGLE_EVENT} variables={{ id }}>
      {({ data, loading }) => {
        const {
          id: eventId,
          title,
          description,
          locations,
          startDate,
          leader,
          attendees,
        } = data.event;

        let isEventLeader = false;
        if (user) {
          isEventLeader = leader.id === user.id;
        }

        if (loading) {
          return <Loader />;
        }

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
                      <h4>{format(startDate, ' ddd Do MMMM YYYY')}</h4>

                      <i
                        className="far fa-clock"
                        style={{ color: '#111111', marginRight: '3px' }}
                      />
                      <h4>{format(startDate, 'HH:mm')}</h4>
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
                    {!isEventLeader && (
                      <JoinButton id={id} attendees={attendees} grid="2">
                        Join Event
                      </JoinButton>
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
      }}
    </Query>
  );
};

export default SingleEvent;

SingleEvent.propTypes = {
  id: PropTypes.string,
};
