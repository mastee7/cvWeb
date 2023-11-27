import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const DropzoneArea = styled.div`
  border: 2px dashed #007bff;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

function ProjectUploadModal({ onClose }) {
  const onDrop = useCallback(acceptedFiles => {
    // Perform the upload here, or set state with the files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <ModalBackdrop>
      <ModalContainer>
        <h2>Upload Project</h2>
        <DropzoneArea {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </DropzoneArea>
        {/* Add more form fields here as needed */}
        <button onClick={onClose}>Close</button>
      </ModalContainer>
    </ModalBackdrop>
  );
}

export default ProjectUploadModal;
