import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import distanceInWords from 'date-fns/distance_in_words';
import { CREATE_COMMENT } from '../graphql/Mutation';
import { GET_COMMENTS } from '../graphql/Query';

import {
  Container,
  ChatContainer,
  ChatArea,
  TextArea,
  ButtonArea,
  PostButton,
  MessageBar,
  ChatItem,
  ChatPic,
  ChatInfo,
  ChatMessage,
  Card,
} from './styled/StyledChat';
import { Title } from './styled/StyledEvent';

const Chat = ({ id }) => {
  const [comment, setComment] = useState('');
  return (
    <Query query={GET_COMMENTS} variables={{ id }}>
      {data => {
        const { comments } = data.data;
        const submit = () => {};
        return (
          <Mutation
            mutation={CREATE_COMMENT}
            variables={{ comment, id }}
            refetchQueries={[{ query: GET_COMMENTS, variables: { id } }]}
          >
            {createComment => (
              <Container>
                <Title>
                  <h1>RideOut Chat</h1>
                </Title>

                <Card>
                  <ChatContainer>
                    <ChatArea>
                      {comments && comments.length === 0 && (
                        <h4>No comments yet!</h4>
                      )}
                      {comments.map(c => (
                        <ChatItem key={c.id}>
                          <ChatPic>
                            <img
                              src={c.user.photo}
                              alt={c.user.firstName}
                              style={{
                                height: '35px',
                                width: '35px',
                                borderRadius: '50%',
                              }}
                            />
                          </ChatPic>
                          <ChatMessage>
                            <h4>
                              {c.user.firstName} {c.user.lastName}
                            </h4>
                            <p>{c.comment}</p>
                          </ChatMessage>
                          <ChatInfo>
                            <h6>{distanceInWords(new Date(), c.createdAt)}</h6>

                            {/* <h6>{format(c.createdAt, 'Do MMM `YY')}</h6>
                            <h6>{format(c.createdAt, 'HH:MM')}</h6> */}
                          </ChatInfo>
                        </ChatItem>
                      ))}
                    </ChatArea>

                    <TextArea
                      type="text"
                      name="chat_text"
                      id="chat_text"
                      onChange={e => setComment(e.target.value)}
                      required
                    >
                      <MessageBar />
                    </TextArea>
                    <ButtonArea>
                      <PostButton onClick={() => createComment()}>
                        Send
                      </PostButton>
                    </ButtonArea>
                  </ChatContainer>
                </Card>
              </Container>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default Chat;

Chat.propTypes = {
  id: PropTypes.string,
};
