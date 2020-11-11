import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { api, UserInfoResponse } from '@internship/shared/api';
import { ProfileImage } from '../../atoms/Image';
import { useParams } from 'react-router-dom';


export const UserInfo = () => {
  const [detail, setDetail] = useState<UserInfoResponse>();
  const [editUserInfo, setEditUserInfo] = useState(false)
  const { userName } = useParams();

  useEffect(() => {
    api.auth
      .userInfo(userName)
      .then((r) => setDetail(r))
      .catch((e) => console.error(e));
  }, [editUserInfo]);

  return (
    <Container>
      <Col sm={6}>
        <div className="card text-center">
          <div className="card-header">
            <h3>Welcome</h3>
            <ProfileImage width="200" height="200" alt={`${detail?.username} profile picture`} image={detail?.image} />
          </div>
          <h5>
            <div>
              <h4>
                <b className="text-black-50">User Info</b>
              </h4>
              <Row>
                <i className="text-black-50 ml-4"> UserName: {detail?.username}</i>
              </Row>
              <Row>
                <i className="text-black-50 ml-4"> Name:{detail?.name}</i>
              </Row>
              <Row>
                <i className="text-black-50 ml-4"> SurName:{detail?.lastName}</i>
              </Row>
              <Row>
                <i className="text-black-50 ml-4"> Age: {detail?.age}</i>
              </Row>
            </div>
          </h5>
        </div>
      </Col>
    </Container>
  );
};
