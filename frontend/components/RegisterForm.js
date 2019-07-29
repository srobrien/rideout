import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
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

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(
      firstName !== '' && lastName !== '' && email !== '' && password !== ''
    );
  }, [email, firstName, lastName, password]);

  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={{
        firstName,
        lastName,
        email,
        password,
        photo: './static/user.jpg',
      }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signUp, { data, error, loading }) => (
        <>
          {!data && (
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
                <FormTitle>
                  {loading ? 'Creating Account' : 'Register for RideOut'}
                </FormTitle>
              </div>
              {loading && <Loader />}
              {error && <Error error={error} />}
              {!loading && (
                <>
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
                      <i
                        className={`fas ${checked ? 'fa-eye-slash' : 'fa-eye'}`}
                      />
                      {checked ? ' Hide ' : ' Show '} Password
                    </label>
                  </CheckBox>
                  <SubmitButton
                    type="submit"
                    disabled={isValid ? '' : 'disabled'}
                  >
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
                </>
              )}
            </StyledForm>
          )}
        </>
      )}
    </Mutation>
  );
};
export default RegisterForm;
