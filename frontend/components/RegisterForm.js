import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_MUTATION } from '../graphql/Mutation';
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

// renders register form to user to allow them to sign up for the application.
const RegisterForm = () => {
  // initiates varaibles and setter functions, set initial component state.
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // validate form fields on input change.
  useEffect(() => {
    setIsValid(
      firstName !== '' && lastName !== '' && email !== '' && password !== ''
    );
  }, [email, firstName, lastName, password]);

  // initiate signUp mutation which will create a new user when called.
  const [signUp, { data, error, loading, called }] = useMutation(
    SIGNUP_MUTATION,
    {
      variables: {
        firstName,
        lastName,
        email,
        password,
        photo: './static/user.jpg',
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  // show spinner if request is ongoing.
  if (loading || (called && !error)) {
    return (
      <StyledForm>
        <div style={{ textAlign: 'center' }}>
          <FormTitle>Creating Account</FormTitle>
          <Loader />
        </div>
      </StyledForm>
    );
  }

  // return register form.
  if (!data) {
    return (
      <StyledForm
        method="post"
        onSubmit={async e => {
          e.preventDefault();
          await signUp();
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <FormTitle>Register for RideOut</FormTitle>
        </div>

        {error && <Error error={error} />}

        <FormGroup>
          <TextInput
            type="text"
            className={firstName !== '' ? 'used' : ''}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <Highlight />
          <Bar />
          <Label>First Name</Label>
        </FormGroup>
        <FormGroup>
          <TextInput
            type="text"
            className={lastName !== '' ? 'used' : ''}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <Highlight />
          <Bar />
          <Label>Last Name</Label>
        </FormGroup>
        <FormGroup>
          <TextInput
            type="email"
            className={email !== '' ? 'used' : ''}
            value={email}
            onChange={e => setEmail(e.target.value)}
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
              onChange={() => setChecked(!checked)}
            />
            <i className={`fas ${checked ? 'fa-eye-slash' : 'fa-eye'}`} />
            {checked ? ' Hide ' : ' Show '} Password
          </label>
        </CheckBox>
        <SubmitButton type="submit" disabled={isValid ? '' : 'disabled'}>
          Register{' '}
        </SubmitButton>
        <div style={{ textAlign: 'center' }}>
          <h4>
            Already Registered?{' '}
            <Link href="/">
              <a>Login</a>
            </Link>
          </h4>
        </div>
      </StyledForm>
    );
  }
};
export default RegisterForm;
