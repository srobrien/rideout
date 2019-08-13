import styled from 'styled-components';
import { SubmitButton } from './StyledForm';

export const Container = styled.div`
  grid-area: Chat;
`;

export const Card = styled.div`
  background-color: #f9f9f9;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  padding: 0;
  margin: 0 0 20px 0;
`;
export const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 8fr 1fr;
  grid-template-rows: 10fr 46px;
  grid-template-areas: 'ChatArea ChatArea' 'TextArea ButtonArea';
`;

export const ChatArea = styled.div`
  height: 400px;
  grid-area: ChatArea;
  overflow-background-position-y: scroll;
  padding: 10px;
  h4 {
    margin-left: 5px;
    color: #111111;
  }
`;

export const ChatItem = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-areas: 'ChatPic ChatMessage ChatInfo';
`;

export const ChatPic = styled.div`
  grid-area: ChatPic;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ChatInfo = styled.div`
  grid-area: ChatInfo;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  h6 {
    margin: 0;
    font-weight: 100;
    color: #222222;
  }
`;
export const ChatMessage = styled.div`
  grid-area: ChatMessage;
  border-top: 1px solid #dad9d9;
  h4 {
    font-weight: 400;
    margin: 20px 0 0 0;
  }

  p {
    font-weight: 100;
    margin: 10px 0 20px 0;
    font-size: 0.9rem;
  }
`;

export const TextArea = styled.div`
  grid-area: TextArea;
`;

export const MessageBar = styled.input`
  height: 100%;
  width: 100%;
  margin: 0;
  border: none;
  padding: 8px;
  font-size: 1rem;
  color: #111111;
  border-bottom: 2px solid #3160b6;
  background: #ececec;
  &:focus {
    outline: none;
  }
`;

export const ButtonArea = styled.div`
  grid-area: ButtonArea;
`;

export const PostButton = styled(SubmitButton)`
  margin: 0;
  &:disabled {
    border-bottom: 2px solid #3160b6;
  }
`;
