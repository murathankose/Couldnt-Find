import React, { useEffect, useState } from 'react';
import { EditProfile } from './profilePageComponents/EditProfile';
import { Button, Col, Row } from 'react-bootstrap';
import { api } from '@internship/shared/api';
import { ProfileImage } from '@internship/ui';

export const Profile = () => {
  const [inEditmode, setInEditMode] = useState(false);
  const [detail, setDetail] = useState({});
  useEffect(() => {
    api.auth
      .userDetail()
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
    api.auth.userDetail().then((r) => {
      setDetail(r);
    });
  }, [inEditmode]);
  const { username, name, lastName, email, phoneNumber, age, image } = detail;

  return (
    <div>
      <h2>Profile Page</h2>
      <Row>
        <Col sm={6}>
          <div className="card text-center">
            <div className="card-header">
              <h3>Welcome</h3>
              <ProfileImage width="200" height="200" alt={`${username} profile picture`} image={image}></ProfileImage>
            </div>
            <h5>
              <div>
                <h4>
                  <b className="text-black-50">User Info</b>
                </h4>
                <Row>
                  <i className="text-black-50 ml-4"> UserName: {username}</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> Name:{name}</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> SurName:{lastName}</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> Age: {age}</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> Phone: {phoneNumber}</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4 "> Email: {email}</i>
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
export default Profile;
