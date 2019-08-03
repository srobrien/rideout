import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import PropTypes from 'prop-types';
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

        return (
          <Mutation
            mutation={CREATE_COMMENT}
            variables={{ comment, id }}
            refetchQueries={[{ query: GET_COMMENTS, variables: { id } }]}
            onCompleted={() => setComment('')}
          >
            {createComment => {
              const handleSubmit = e => {
                e.preventDefault();
                if (comment.length > 0) {
                  createComment();
                }
              };
              return (
                <Container>
                  <Title>
                    <h1>RideOut Chat</h1>
                  </Title>

                  <Card>
                    <form onSubmit={e => handleSubmit(e)}>
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
                                <h6>
                                  {distanceInWords(new Date(), c.createdAt)}
                                </h6>
                              </ChatInfo>
                            </ChatItem>
                          ))}
                        </ChatArea>

                        <TextArea>
                          <MessageBar
                            type="text"
                            name="chat_text"
                            id="chat_text"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                          />
                        </TextArea>
                        <ButtonArea>
                          <PostButton
                            disabled={comment.length === 0}
                            onClick={e => handleSubmit(e)}
                          >
                            Send
                          </PostButton>
                        </ButtonArea>
                      </ChatContainer>
                    </form>
                  </Card>
                </Container>
              );
            }}
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
