import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { api, ContentResponse, UserInfoResponse } from '@internship/shared/api';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { MyLikes, ProfileImage } from '@internship/ui';

const StyledRow = styled(Row)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const StyledRowContent = styled(StyledRow)`
  display: block;
`;

const StyledContainer = styled(Container)`
  margin-top: 1.5rem;
  @media (min-width: 768px) {
    padding-right: 3.2rem;
  }
`;

const StyledStrong = styled.strong`
  margin-right: 1rem;
`;

const StyledLink = styled(Link)`
  color: black;
`;

export const UserInfo = () => {
  const [detail, setDetail] = useState<UserInfoResponse>();
  const { userName } = useParams();
  const [contentsInfo, setContentsInfo] = useState(false);
  const [likeInfo, setLikeInfo] = useState(false);
  const [dislikeInfo, setDislikeInfo] = useState(false);
  const [userContents, setUserContents] = useState<ContentResponse[]>();

  useEffect(() => {
    api.auth
      .userInfo(userName)
      .then((r) => setDetail(r))
      .catch((e) => console.error(e));
    setLikeInfo(false);
    setDislikeInfo(false);
  }, [userName]);

  useEffect(() => {
    api.auth
      .userContents(userName)
      .then((r) => setUserContents(r))
      .catch((e) => console.error(e));
    setLikeInfo(false);
    setDislikeInfo(false);
  }, [userName]);

  const LookUserContents = () => {
    setContentsInfo(true);
    setDislikeInfo(false);
    setLikeInfo(false);
  };
  const LookUserLike = () => {
    setLikeInfo(true);
    setContentsInfo(false);
    setDislikeInfo(false);
  };
  const LookUserDislike = () => {
    setDislikeInfo(true);
    setContentsInfo(false);
    setLikeInfo(false);
  };
  return (
    <StyledContainer>
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
              </div>
            </h5>
            <Button className="btn  btn-success mt-2" disabled={contentsInfo} onClick={LookUserContents}>
              User Contents
            </Button>
            <Button className="btn  btn-success mt-2" disabled={likeInfo} onClick={LookUserLike}>
              User Likes
            </Button>
            <Button className="btn  btn-success mt-2" disabled={dislikeInfo} onClick={LookUserDislike}>
              User Dislikes
            </Button>
          </div>
        </Col>
        <Col sm={6}>
          {contentsInfo ? (
            <>
              <Button className="btn btn-danger mb-3" disabled={!contentsInfo} onClick={() => setContentsInfo(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <StyledRow>
                {userContents?.map((d, key) => (
                  <li key={key} className="ml-4">
                    <StyledRowContent>
                      <StyledStrong>
                        Konu Adı : <StyledLink to={'/contents/' + d.topic.topicName}>{d.topic.topicName}</StyledLink>
                      </StyledStrong>
                      <br />
                      <StyledStrong> {d.content} </StyledStrong>
                      <br />
                      <p>
                        Like: {d.like} Dislike: {d.dislike}
                      </p>
                      <StyledStrong>Tarih : {d.createDate.substring(0, 10)}</StyledStrong>
                      <StyledStrong>Saat : {d.createDate.substring(11, 16)}</StyledStrong>
                    </StyledRowContent>
                  </li>
                ))}
              </StyledRow>
            </>
          ) : null}
          {likeInfo ? (
            <>
              <Button className="btn btn-danger mb-3" disabled={!likeInfo} onClick={() => setLikeInfo(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <MyLikes username={userName} likeOrDislike={true} isGuest={true} />
            </>
          ) : null}
          {dislikeInfo ? (
            <>
              <Button className="btn btn-danger mb-3" disabled={!dislikeInfo} onClick={() => setDislikeInfo(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <MyLikes username={userName} likeOrDislike={false} isGuest={true} />
            </>
          ) : null}
        </Col>
      </Row>
    </StyledContainer>
  );
};
