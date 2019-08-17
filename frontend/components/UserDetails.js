import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../graphql/Query';
import { UPDATE_USER_MUTATION } from '../graphql/Mutation';
import PhotoUpload from './PhotoUpload';
import { Loader } from './styled/StyledLoader';
import { Success, Error } from './Alerts';
import AppLayout from './AppLayout';
import {
  StyledForm,
  FormGroup,
  TextInput,
  Highlight,
  Bar,
  Label,
  CheckBox,
  SubmitButton,
  FormGrid,
  Left,
  Right,
  Bottom,
  PageContainer,
} from './styled/StyledForm';

const UserDetails = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState('');
  const userPhoto = user.photo || './static/user.jpg';
  const [checked, setChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [preview, setPreview] = useState(userPhoto);
  const [imgLoading, setImgLoading] = useState(false);
  useEffect(() => {
    setIsValid(firstName !== '' && lastName !== '');
  }, [firstName, lastName, password]);
  const [updateUser, { data, error, loading }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      variables: {
        firstName,
        lastName,
        password,
        id: user.id,
        photo: preview,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  return (
    <AppLayout>
      <>
        {error && <Error error={error} />}
        {data && (
          <Success width="90%" mb="5px" msg="Success! Details Updated!" />
        )}
        <PageContainer>
          <StyledForm
            width="90%"
            margin="0.9em auto"
            padding="3em 2em 2em 2em"
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await updateUser();
            }}
          >
            {loading && <Loader />}
            {!loading && (
              <FormGrid>
                <Left>
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
                      value={password}
                      className={password !== '' ? 'used' : ''}
                      onChange={e => setPassword(e.target.value)}
                      type={checked ? 'text' : 'password'}
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
                      <i
                        className={`fas ${checked ? 'fa-eye-slash' : 'fa-eye'}`}
                      />
                      {checked ? ' Hide ' : ' Show '} Password
                    </label>
                  </CheckBox>
                </Left>
                <Right>
                  {imgLoading && <Loader />}
                  {!imgLoading && (
                    <div>
                      <img
                        src={preview}
                        alt="user"
                        style={{ width: '200px', height: '200px' }}
                      />
                      <h4>{`${firstName} ${lastName}`}</h4>

                      <PhotoUpload
                        setPhoto={setPreview}
                        setLoading={setImgLoading}
                      />
                    </div>
                  )}
                </Right>
                <Bottom>
                  <SubmitButton
                    type="submit"
                    disabled={isValid ? '' : 'disabled'}
                  >
                    Update Details{' '}
                  </SubmitButton>
                </Bottom>
              </FormGrid>
            )}
          </StyledForm>
        </PageContainer>
      </>
    </AppLayout>
  );
};

UserDetails.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    password: '',
    id: '',
    email: '',
  },
};

export default UserDetails;

UserDetails.propTypes = {
  user: PropTypes.object,
};
