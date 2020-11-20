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

const StyledRow = styled(Row)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const StyledRowContent = styled(StyledRow)`
  display: block;
`;

const StyledContainer = styled(Container)`
  @media (min-width: 768px) {
    padding-right: 3.2rem;
  }
`;
const StyledStrong = styled.strong`
  margin-right: 1rem;
`;

const StyledContent = styled(StyledStrong)`
  color: blueviolet;
  font-weight: 500;
`;

const StyledCancelLikeButton = styled(Button)`
  background-color: red;
  font-size: 0.7rem;
  margin-right: 3.2rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  &:focus {
  background-color: red;
  box-shadow: none;
  }
`;

const StyledLink = styled(Link)`
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
      <StyledRow>
        {(likeOrDislike ? myLike?.content : myDislike?.content)?.map((d, key) => (
          <li style={{ listStyleType: 'none' }} key={key} className="ml-4">
            <StyledRowContent>
              <StyledStrong>
                Konu Adı : <StyledLink
                to={'/contents/' + d.content.topic.topicName}>{d.content.topic.topicName}</StyledLink>
              </StyledStrong>
              <br />
              <StyledContent>{d.content.content} </StyledContent>
              {!isGuest ? (
                <>
                  <br />
                  {likeOrDislike ? (
                    <>
                      <StyledCancelLikeButton onClick={() => addLike(d.id.contentId, 'cancel-like')}>
                        <FontAwesomeIcon icon={faThumbsDown} />
                      </StyledCancelLikeButton>
                      <br />
                      <StyledStrong>Beğenme
                        Tarihi: <StyledContent>{d.likeDate.substring(0, 10)} - {d.likeDate.substring(11, 16)}</StyledContent></StyledStrong>
                    </>
                  ) : (
                    <>
                      <StyledCancelLikeButton onClick={() => addLike(d.id.contentId, 'cancel-dislike')}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </StyledCancelLikeButton>
                      <br />
                      <StyledStrong>Beğenmeme
                        Tarihi: <StyledContent>{d.dislikeDate.substring(0, 10)} - {d.dislikeDate.substring(11, 16)}</StyledContent></StyledStrong>
                    </>
                  )}
                </>
              ) : null}
              <br />
              <StyledStrong>
                Kullanıcı : <StyledLink to={'/user/' + d.user.username}>{d.user.username}</StyledLink>
              </StyledStrong>
              <br />
              <StyledStrong>
                Oluşturulma Tarihi : <StyledContent>{d.content.createDate.substring(0, 10)}</StyledContent>
              </StyledStrong>
              <StyledStrong>
                Saat :<StyledContent> {d.content.createDate.substring(11, 16)}</StyledContent>
              </StyledStrong>
            </StyledRowContent>
          </li>
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
      </StyledRow>
    </StyledContainer>
  );
};
