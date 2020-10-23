import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { UserForm } from '@internship/ui';

export const EditProfile = ({ ...props }) => {
  return (
    <Container fluid>
      <Row>
        <h3>Edit Profile</h3>
      </Row>
      <UserForm />
    </Container>
  );
};

export default EditProfile;
