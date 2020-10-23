import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { UserForm } from '@internship/ui';

export const EditProfile = ({ setInEditMode, setEditUserInfo, ...props }) => {
  return (
    <Container fluid>
      <Row>
        <h3>Edit Profile</h3>
      </Row>
      <UserForm setEditUserInfo={setEditUserInfo} setInEditMode={setInEditMode} />
    </Container>
  );
};

export default EditProfile;
