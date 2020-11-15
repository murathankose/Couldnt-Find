import React, { useEffect, useState } from 'react';
import { EditProfile, ChangePassword, EditSession, MyContents } from './profilePageComponents';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { api, ContentResponse, UserDetailResponse } from '@internship/shared/api';
import { ProfileImage } from '@internship/ui';
import { useAuthentication } from '@internship/shared/hooks';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const Profile = () => {
  const [inEditMode, setInEditMode] = useState(false);
  const [inChangePassword, setInChangePassword] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState(false);
  const [sessionInfo, setSessionInfo] = useState(false);
  const [contentsInfo, setContentsInfo] = useState(false);
  const [detail, setDetail] = useState<UserDetailResponse>();
  const [myContents, setMyContents] = useState<ContentResponse[]>();
  const { isAuthenticated } = useAuthentication();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    api.auth
      .userDetail()
      .then((r) => setDetail(r))
      .catch((e) => console.error(e));
    setEditUserInfo(false);
  }, [editUserInfo]);

  useEffect(() => {
    api.auth
      .myContents()
      .then((r) => setMyContents(r))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  const changeValues = () => {
    setInEditMode(true);
    setInChangePassword(false);
    setSessionInfo(false);
    setContentsInfo(false);
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  };


  const editSessionInfo = () => {
    setSessionInfo(true);
    setInChangePassword(false);
    setInEditMode(false);
    setContentsInfo(false);
  };
  const editContentsInfo = () => {
    setContentsInfo(true);
    setSessionInfo(false);
    setInChangePassword(false);
    setInEditMode(false);
  };

  return (
    <Container>
      <h2>Profile Page</h2>
      <Row>
        <Col sm={6}>
          <div className="card text-center">
            <div className="card-header">
              <h3>Welcome</h3>
              <ProfileImage width="200" height="200" alt={`${detail?.username} profile picture`}
                            image={detail?.image} />
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
                <Row>
                  <i className="text-black-50 ml-4"> Phone: {detail?.phoneNumber}</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4 "> Email: {detail?.email}</i>
                </Row>
              </div>
            </h5>
            <Button className="btn  btn-success mt-2" disabled={inEditMode} onClick={changeValues}>
              Edit Profile
            </Button>
            <Button
              className="btn  btn-success mt-2"
              disabled={inChangePassword}
              onClick={() => {
                setInChangePassword(true);
                setInEditMode(false);
                dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                setSessionInfo(false);
              }}
            >
              Change Password
            </Button>
            <Button className="btn  btn-success mt-2" disabled={sessionInfo} onClick={editSessionInfo}>
              Session Info
            </Button>
            <Button className="btn  btn-success mt-2" disabled={contentsInfo} onClick={editContentsInfo}>
              My Contents
            </Button>
          </div>
        </Col>
        <Col sm={6}>
          {inEditMode && (
            <>
              <Button
                className="btn btn-danger"
                disabled={!inEditMode}
                onClick={() => {
                  setInEditMode(false);
                  dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                  dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <EditProfile setInEditMode={setInEditMode} setEditUserInfo={setEditUserInfo} userInfo={detail} />
            </>
          )}
          {inChangePassword && (
            <>
              <Button
                className="btn btn-danger"
                disabled={!inChangePassword}
                onClick={() => {
                  setInChangePassword(false);
                  dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                  dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <ChangePassword />
            </>
          )}
          {sessionInfo ? (
            <>
              <Button className="btn btn-danger mb-3" disabled={!sessionInfo} onClick={() => setSessionInfo(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <EditSession />
            </>
          ) : null}
          {contentsInfo ? (
            <>
              <Button className="btn btn-danger mb-3" disabled={!contentsInfo} onClick={() => setContentsInfo(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <MyContents myContents={myContents}/>
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};
