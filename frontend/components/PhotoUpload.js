import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { Container } from './styled/StyledPhotoUpload';

const PhotoUpload = ({ setPhoto, setLoading }) => {
  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        return;
      }
      setLoading(true);
      const data = new FormData();
      data.append('file', acceptedFiles[0]);
      data.append('upload_preset', 'rideout');

      const res = await fetch(
        '	https://api.cloudinary.com/v1_1/devstache/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
      const file = await res.json();
      setPhoto(file.secure_url);
      setLoading(false);
    },
    [setLoading, setPhoto]
  );

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
