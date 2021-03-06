import styled, { keyframes } from 'styled-components';

export const inputHighlighter = keyframes`
from { background: #4a89dc; }
	to 	{ width: 0; background: transparent; }`;

export const StyledForm = styled.form`
  grid-area: Form;
  width: ${props => props.width};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  min-height: ${props => props.height || 0};
  background: #fafafa;
  border: 1px solid #ebebeb;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;

StyledForm.defaultProps = {
  width: '380px',
  margin: '4em auto',
  padding: '2em 2em 2em 2em',
};

export const FormGroup = styled.div`
  position: relative;
  margin-bottom: 45px;
`;

export const Label = styled.label`
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: all 0.2s ease;
`;

export const Bar = styled.span`
  position: relative;
  display: block;
  width: 100%;

  &:before,
  &:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #4a89dc;
    transition: all 0.2s ease;
  }

  &:before {
    left: 50%;
  }

  &:after {
    right: 50%;
  }
`;

export const Highlight = styled.span`
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
`;

export const TextInput = styled.input`
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  -webkit-appearance: none;
  display: block;
  background: #fafafa;
  color: ${props => props.color};
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #757575;
  &:focus {
    outline: none;
  }
  &:focus ~ ${Label}, &.used ~ ${Label} {
    top: -20px;
    transform: scale(0.75);
    left: -2px;
    color: #4a89dc;
  }

  &:focus ~ ${Bar}:before, &:focus ~ ${Bar}:after {
    width: 50%;
  }

  &:focus ~ ${Highlight} {
    animation: ${inputHighlighter} 0.3s ease;
  }
`;

TextInput.defaultProps = {
  color: '#636363',
};

export const CheckBox = styled.div`
  margin-bottom: 10px;
  input[type='checkbox'] {
    position: absolute;
    left: -99999px;
  }
  label {
    font-size: 0.8rem;
    cursor: pointer;
    color: #757575;
  }
`;

export const SubmitButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 12px 24px;
  margin: 0.3em 0 1em 0;
  width: 100%;
  vertical-align: middle;
  color: #fff;
  font-size: 16px;
  line-height: 20px;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  letter-spacing: 1px;
  background: #4a89dc;
  text-shadow: 1px 1px 0 rgba(39, 110, 204, 0.5);
  border: 0;
  border-bottom: 2px solid #3160b6;
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover {
    background: #357bd8;
  }

  &:focus {
    outline: 0;
  }

  &:disabled {
    background: #eaeaea;
    color: #c2c2c2c2;
    text-shadow: 1px 1px 0 rgba(203, 203, 203, 0.5);
    border-bottom: 2px solid #cbcbcbcb;
    cursor: not-allowed;
  }
`;

export const FormTitle = styled.h1`
  margin-top: 0;
`;

export const MainTitle = styled.h3`
  margin-top: 0;
  color: #636363;
`;

export const FormGrid = styled.div`
  display: grid;
  @media screen and (max-width: 680px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, min-content);
    grid-template-areas: 'Left' 'Right' 'Bottom';
  }
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas: 'Left Right' 'Bottom Bottom';
`;

export const Left = styled.div`
  grid-area: Left;
`;
export const Right = styled.div`
  grid-area: Right;
  @media screen and (max-width: 680px) {
    margin-top: 10px;
    border-top: 1px solid #757575;
    > div {
      margin-top: 20px;
    }
  }

  align-self: center;
  margin: 0 auto;
  text-align: center;
  min-height: 375px;
`;
export const Bottom = styled.div`
  grid-area: Bottom;
  height: 100%;
  margin-top: 40px;
`;

export const DTInput = styled.input`
  font-size: 16px;
  margin: 20px 0 0 5px;
  padding: 2px;
`;

export const DTLabel = styled.label`
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: -10px;
`;

export const Mobile = styled.div`
  @media screen and (min-width: 820px) {
    display: none;
  }
`;

export const Desktop = styled.div`
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

export const PageContainer = styled.div`
  height: 100vh;
  @media screen and (max-width: 680px) {
    padding-bottom: 20px;
    height: 100%;
  }
`;
