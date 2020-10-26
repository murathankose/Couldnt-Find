import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { UserForm } from '@internship/ui';

type EditProfileProps = {
  setInEditMode;
  setEditUserInfo;
};

export const EditProfile: React.FC<EditProfileProps> = ({ setInEditMode, setEditUserInfo }) => {
  return (
    <Container fluid>
      <Row>
        <h3>Edit Profile</h3>
      </Row>
      <UserForm setEditUserInfo={setEditUserInfo} setInEditMode={setInEditMode} />
    </Container>
  );
};
