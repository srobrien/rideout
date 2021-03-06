import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { SIGNIN_MUTATION } from '../graphql/Mutation';
import { CURRENT_USER_QUERY } from '../graphql/Query';
import {
  StyledForm,
  FormGroup,
  TextInput,
  Highlight,
  Bar,
  Label,
  CheckBox,
  SubmitButton,
  FormTitle,
} from './styled/StyledForm';
import { Loader } from './styled/StyledLoader';
import { Error } from './Alerts';

// login form displayed to user if valid cookie is not set on client.
const LoginForm = () => {
  // set up initial variables, setters and set initial state.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [signIn, { error, loading, called }] = useMutation(SIGNIN_MUTATION, {
    variables: { email, password },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  }); // initiate signIn mutation which will authenticate and authorise user.

  // check if form contents are filled and valid.
  useEffect(() => {
    setIsValid(email !== '' && password !== '');
  }, [setEmail, password, email]);

  // show spinner if requests are being made.
  if (loading || (called && !error)) {
    return (
      <StyledForm>
        <div style={{ textAlign: 'center' }}>
          <FormTitle>Logging into RideOut</FormTitle>
          <Loader />
        </div>
      </StyledForm>
    );
  }

  // main login form.
  return (
    <StyledForm
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await signIn();
        setEmail('');
        setPassword('');
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <FormTitle>
          {loading ? 'Logging into RideOut' : 'Login to RideOut'}
        </FormTitle>
      </div>

      {error && <Error error={error} />}

      <>
        <FormGroup>
          <TextInput
            type="email"
            className={email !== '' ? 'used' : ''}
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            required
          />
          <Highlight />
          <Bar />
          <Label>Email</Label>
        </FormGroup>
        <FormGroup>
          <TextInput
            value={password}
            className={password !== '' ? 'used' : ''}
            onChange={e => setPassword(e.target.value)}
            type={checked ? 'text' : 'password'}
            required
          />
          <Highlight />
          <Bar />
          <Label>Password</Label>
        </FormGroup>
        <CheckBox>
          <label htmlFor="show">
            <input
              type="checkbox"
              name="show"
              id="show"
              onChange={e => setChecked(!checked)}
            />
            <i className={`fas ${checked ? 'fa-eye-slash' : 'fa-eye'}`} />
            {checked ? ' Hide ' : ' Show '} Password
          </label>
        </CheckBox>
        <SubmitButton type="submit" disabled={isValid ? '' : 'disabled'}>
          Submit{' '}
        </SubmitButton>

        <div style={{ textAlign: 'center' }}>
          <h4>
            {`Don't have an account? `}
            <Link href="/register">
              <a> Register</a>
            </Link>
          </h4>
        </div>
      </>
    </StyledForm>
  );
};
export default LoginForm;
