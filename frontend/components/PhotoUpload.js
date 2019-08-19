import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { Container } from './styled/StyledPhotoUpload';

// component renders photo upload component, uses dropZone hook to provide functionality.
const PhotoUpload = ({ setPhoto, setLoading }) => {
  // helper funtion to handle upload of user photo.
  const onDrop = useCallback(
    // checks whether any file types provided have been rejected
    async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        return;
      }
      // sets loading flag to true so spinner can be displayed.
      setLoading(true);
      // creates empty FormData object to contruct object to store file information.
      const data = new FormData();
      // adds key file with value as the uploaded file to data.
      data.append('file', acceptedFiles[0]);
      // adds key upload_preset to tell API which directory to store file.
      data.append('upload_preset', 'rideout');

      // carry out API call to cloudinary cloud storage.
      const res = await fetch(
        '	https://api.cloudinary.com/v1_1/devstache/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
      // get cloudinary response object
      const file = await res.json();
      // updates URL of uploaded file.
      setPhoto(file.secure_url);
      // set loading flag to false.
      setLoading(false);
    },
    [setLoading, setPhoto]
  );

  // destructures varaibles from useDropzone package for use in photo component.
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' });

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>
          To upload a new profile photo, Drag 'n' drop images here, or click to
          select files
        </p>
      )}
    </Container>
  );
};

PhotoUpload.propTypes = {
  setPhoto: PropTypes.func,
  setLoading: PropTypes.func,
};

export default PhotoUpload;
