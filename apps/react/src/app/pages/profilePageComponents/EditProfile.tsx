import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { UserForm } from '@internship/ui';

type EditProfileProps = {
  setInEditMode;
  setEditUserInfo;
  userInfo;
};

export const EditProfile: React.FC<EditProfileProps> = ({ setInEditMode, setEditUserInfo, userInfo }) => {
  return (
    <Container fluid>
      <Row>
        <h3>Edit Profile</h3>
      </Row>
      <UserForm setEditUserInfo={setEditUserInfo} setInEditMode={setInEditMode} userInfo={userInfo} />
    </Container>
  );
};
