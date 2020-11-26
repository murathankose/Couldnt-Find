import React, { useEffect, useState } from 'react';
import { api, Pageable } from '@internship/shared/api';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import { getUserName } from '@internship/shared/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { likeAsync } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';

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

const StyledLikeButton = styled(Button)`
  background-color: white;
  color: blue;
  border-color: white;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 0.3rem;
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

export const MostLikedContent = () => {
  const [allContentsOrderByLike, setAllContentsOrderByLike] = useState<Pageable>();
  const [page, setPage] = useState({ number: 0 });
  const { isAuthenticated } = useAuthentication();
  const { isSuccessRequired } = useTemporary();
  const dispatch = useDispatch();

  const addLike = (contentID, likes) => {
    const values = { contentID: contentID, like: likes };
    dispatch(likeAsync.request(values));
  };

  useEffect(() => {
    api.auth
      .getContentOrderByLike(page.number, 5)
      .then((r) => setAllContentsOrderByLike(r))
      .catch((e) => console.error(e));
  }, [page, isSuccessRequired]);

  return (
    <Col sm={5}>
      <div className="card">
        <div className="card-header">
          <h4>
            <b className="text-black-50">En Beğenilen İçerikler</b>
          </h4>
        </div>
        {allContentsOrderByLike?.content?.map((d, key) => (
          <div key={key}>
            <ul className="list-group list-group-flush">
              <li key={key} className="list-group-item ">
                <StyledRow>
                  <StyledLink className="nav-link" to={'/topics/' + d.topic.id}>
                    {d.topic.topicName}
                  </StyledLink>
                </StyledRow>
                <StyledRow>
                  <StyledContent>{d.content}</StyledContent>
                </StyledRow>
                <StyledRow>
                  {isAuthenticated ? (
                    <>
                      {d.userLike.some((element) => element.user.username === getUserName()) ? (
                        <StyledCancelLikeButton
                          onClick={() => addLike(d.id, 'cancel-like')}
                          disabled={d.userDislike.some((element) => element.user.username === getUserName())}
                        >
                          <FontAwesomeIcon icon={faThumbsUp} />
                        </StyledCancelLikeButton>
                      ) : (
                        <StyledLikeButton
                          onClick={() => addLike(d.id, 'like')}
                          disabled={d.userDislike.some((element) => element.user.username === getUserName())}
                        >
                          <FontAwesomeIcon icon={faThumbsUp} />
                        </StyledLikeButton>
                      )}
                      {d.userDislike.some((element) => element.user.username === getUserName()) ? (
                        <StyledCancelLikeButton
                          onClick={() => addLike(d.id, 'cancel-dislike')}
                          disabled={d.userLike.some((element) => element.user.username === getUserName())}
                        >
                          <FontAwesomeIcon icon={faThumbsDown} />
                        </StyledCancelLikeButton>
                      ) : (
                        <StyledLikeButton
                          onClick={() => addLike(d.id, 'dislike')}
                          disabled={d.userLike.some((element) => element.user.username === getUserName())}
                        >
                          <FontAwesomeIcon icon={faThumbsDown} />
                        </StyledLikeButton>
                      )}
                      <br />
                    </>
                  ) : null}
                  <StyledDown>
                    <StyledStrong>{d.createDate.substring(0, 10)}</StyledStrong>
                    <StyledStrong>{d.createDate.substring(11, 16)}</StyledStrong>
                    <StyledUserName to={'/user/' + d.user.username}>{d.user.username}</StyledUserName>
                  </StyledDown>
                </StyledRow>
              </li>
            </ul>
          </div>
        ))}
        <Row className="justify-content-md-center">
          <Col xs lg="1">
            {!allContentsOrderByLike?.first ? (
              <Button className="btn btn-sm mt-2" variant="outline-primary"
                      onClick={() => setPage({ number: page.number - 1 })}>
                {'<'}
              </Button>
            ) : null}
          </Col>
          <Col xs lg="1">
            {!allContentsOrderByLike?.last ? (
              <Button className="btn btn-sm mt-2 " variant="outline-primary"
                      onClick={() => setPage({ number: page.number + 1 })}>
                {'>'}
              </Button>
            ) : null}
          </Col>
        </Row>
      </div>
    </Col>
  );
};
