import React from 'react';
import EditProfile from './profilePageComponents/EditProfile';
import { Col, Row } from 'react-bootstrap';

export const Profile = () => {
  return (
    <div>
      <h2>Profile Page</h2>
      <Row>
        <Col sm={4}>

        </Col>
        <Col sm={6}>
          <EditProfile />
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
