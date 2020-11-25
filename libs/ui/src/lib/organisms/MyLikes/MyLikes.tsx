import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { api, Pageable } from '@internship/shared/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { likeAsync } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { Button } from '../../atoms/Button';
import { useTemporary } from '@internship/shared/hooks';

const StyledContainer = styled(Container)`
  margin-top:1.5rem;

`;
const StyledRow = styled(Row)`
  flex-flow: row;
`;

const StyledDown = styled.p`
  color: blueviolet;
  margin-left: auto;
  margin-right: 1rem;
  align-self: center;
  font-weight: 200;
  margin-bottom: unset;
`;

const StyledContent = styled.strong`
  color: blueviolet;
  margin-left: 1rem;
  align-self: center;
`;

const StyledCancelLikeButton = styled(Button)`
  background-color: white;
  color: red;
  border-color: white;
  font-size: 0.7rem;
  margin-left: 0.3rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;

`;
const StyledStrong = styled.strong`
  margin-right: 1rem;
`;

const StyledLink = styled(Link)`
  font-weight: 700;
  font-size: large;
  color: initial;
`;

const StyledUserName = styled(Link)`
  font-weight: 400;
  color: blueviolet;
`;

type MyContentsProps = {
  username;
  likeOrDislike;
  isGuest;
};

export const MyLikes: React.FC<MyContentsProps> = ({ username, likeOrDislike, isGuest }) => {
  const [myLike, setMyLike] = useState<Pageable>();
  const [myDislike, setMyDislike] = useState<Pageable>();
  const dispatch = useDispatch();
  const [pageLike, setPageLike] = useState({ number: 0 });
  const [pageDislike, setPageDislike] = useState({ number: 0 });
  const { isSuccessRequired } = useTemporary();

  const addLike = (contentID, likes) => {
    const values = { contentID: contentID, like: likes };
    dispatch(likeAsync.request(values));
  };

  useEffect(() => {
    setPageLike({ number: 0 });
    setPageDislike({ number: 0 });
  }, [isSuccessRequired]);

  useEffect(() => {
    api.auth
      .getLikes('like', username, pageLike.number)
      .then((r) => {
        setMyLike(r);
      })
      .catch((e) => console.error(e));
  }, [pageLike]);

  useEffect(() => {
    api.auth
      .getLikes('dislike', username, pageDislike.number)
      .then((r) => {
        setMyDislike(r);
      })
      .catch((e) => console.error(e));
  }, [pageDislike]);
  return (
    <StyledContainer>
      <div className="card">
        <div className="card-header">
          <h4>
            <b className="text-black-50">Beğendiğim İçerikler</b>
          </h4>
        </div>
        {(likeOrDislike ? myLike?.content : myDislike?.content)?.map((d, key) => (
          <div key={key}>
            <ul className="list-group list-group-flush">
              <li key={key} className="list-group-item ">
                <StyledRow>
                  <StyledLink className="nav-link" to={'/contents/' + d?.content?.topic.id}>
                    {d.content?.topic.topicName}
                  </StyledLink>
                </StyledRow>
                <StyledRow>
                  <StyledContent>{d.content?.content}</StyledContent>
                </StyledRow>
                <StyledRow>
                  {!isGuest ? (
                    <>
                      <br />
                      {likeOrDislike ? (
                        <StyledCancelLikeButton onClick={() => addLike(d?.id?.contentId, 'cancel-like')}>
                          <FontAwesomeIcon icon={faThumbsDown} />
                        </StyledCancelLikeButton>
                      ) : (
                        <StyledCancelLikeButton onClick={() => addLike(d.id.contentId, 'cancel-dislike')}>
                          <FontAwesomeIcon icon={faThumbsUp} />
                        </StyledCancelLikeButton>
                      )}
                    </>
                  ) : null}
                  <StyledDown>
                    <StyledStrong>{d.content?.createDate.substring(0, 10)}</StyledStrong>
                    <StyledStrong>{d.content?.createDate.substring(11, 16)}</StyledStrong>
                    <StyledUserName to={'/user/' + d.content?.user.username}>{d.content?.user.username}</StyledUserName>
                  </StyledDown>
                </StyledRow>
              </li>
            </ul>
          </div>
        ))}
        {likeOrDislike ? (
          <Row className="justify-content-md-center">
            <Col xs lg="1">
              {!myLike?.first ? (
                <Button className="btn btn-sm mt-2" variant="outline-primary"
                        onClick={() => setPageLike({ number: pageLike.number - 1 })}>
                  {'<'}
                </Button>
              ) : null}
            </Col>
            <Col xs lg="1">
              {!myLike?.last ? (
                <Button className="btn btn-sm mt-2 " variant="outline-primary"
                        onClick={() => setPageLike({ number: pageLike.number + 1 })}>
                  {'>'}
                </Button>
              ) : null}
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-md-center">
            <Col xs lg="1">
              {!myDislike?.first ? (
                <Button className="btn btn-sm mt-2" variant="outline-primary"
                        onClick={() => setPageDislike({ number: pageDislike.number - 1 })}>
                  {'<'}
                </Button>
              ) : null}
            </Col>
            <Col xs lg="1">
              {!myDislike?.last ? (
                <Button className="btn btn-sm mt-2 " variant="outline-primary"
                        onClick={() => setPageDislike({ number: pageDislike.number + 1 })}>
                  {'>'}
                </Button>
              ) : null}
            </Col>
          </Row>
        )}
      </div>
    </StyledContainer>
  );
};
