import React, { useEffect, useState } from 'react';
import { EditProfile } from './profilePageComponents/EditProfile';
import { Button, Col, Row } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/all';
import { api } from '@internship/shared/api';

export const Profile = () => {
  const [inEditmode, setInEditMode] = useState(false);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    api.auth.userDetail().then((r) => setUsername(r.username));
  });

  return (
    <div>
      <h2>Profile Page</h2>
      <Row>
        <Col sm={4}>
          <div className="card text-center">
            <div className="card-header">
              <h3>Welcome</h3>
              <FaUserAlt />
            </div>
            <h5>
              <div>
                <h4>
                  <b className="text-black-50">User Info</b>
                </h4>
                <Row>
                  <i className="text-black-50 ml-4"> UserName: {username} </i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> Name:</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> SurName:</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> Phone:</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> Email:</i>
                </Row>
              </div>
            </h5>
            <Button className="btn btn-success" disabled={inEditmode} onClick={() => setInEditMode(true)}>
              {' '}
              Edit Profile
            </Button>
          </div>
        </Col>
        <Col sm={6}>
          {inEditmode && (
            <>
              <Button className="btn btn-success" disabled={!inEditmode} onClick={() => setInEditMode(false)}>
                {' '}
                Edit Profile Close
              </Button>
              <EditProfile />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};
