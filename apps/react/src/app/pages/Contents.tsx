import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { api, Pageable } from '@internship/shared/api';
import { faPlus, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Button, ContentForm } from '@internship/ui';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { likeAsync } from '@internship/store/authentication';
import { getUserName } from '@internship/shared/utils';

const StyledRow = styled(Row)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const StyledRowContent = styled(StyledRow)`
  display: block;
`;

const StyledNewButton = styled(Button)`
  margin-left: auto;
  background-color: blueviolet;
`;
const StyledLikeButton = styled(Button)`
  background-color: blue;
  font-size: 0.7rem;
  margin-right: 3.2rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;
const StyledCancelLikeButton = styled(Button)`
  background-color: red;
  font-size: 0.7rem;
  margin-right: 3.2rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
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
const StyledContent = styled(StyledStrong)`
  color: blueviolet;
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  color: blueviolet;
`;

export const Contents = () => {
  const { topicName } = useParams();
  const [allContent, setAllContent] = useState<Pageable>();
  const [newContent, setNewContent] = useState(false);
  const { isAuthenticated } = useAuthentication();
  const dispatch = useDispatch();
  const { isSuccessRequired } = useTemporary();
  const [page, setPage] = useState({ number: 0 });

  useEffect(() => {
    api.auth
      .getContent(topicName, page.number)
      .then((r) => {
        setAllContent(r);
      })
      .catch((e) => console.error(e));
  }, [page, isSuccessRequired]);


  const addLike = (contentID, likes) => {
    const values = { contentID: contentID, like: likes };
    dispatch(likeAsync.request(values));
  };

  return (
    <StyledContainer>
      <h1>{topicName}</h1>
      {isAuthenticated ? (
        <StyledRow>
          <StyledNewButton onClick={() => setNewContent(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </StyledNewButton>
        </StyledRow>
      ) : null}
      {newContent ?
        <ContentForm setClose={setNewContent} topicName={topicName} /> : null}
      {allContent?.content?.map((d, key) => (
        <li style={{ listStyleType: 'none' }} key={key} className="ml-4">
          <StyledRowContent>
            <StyledContent>{d.content}</StyledContent>
            <br />
            <StyledStrong>Kullanıcı:</StyledStrong> <StyledLink
            to={'/user/' + d.user.username}>{d.user.username}</StyledLink>
            <br />
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
            <StyledStrong>
              Tarih :<StyledContent> {d.createDate.substring(0, 10)}</StyledContent>
            </StyledStrong>
            <StyledStrong>
              Saat :<StyledContent> {d.createDate.substring(11, 16)}</StyledContent>
            </StyledStrong>
            <br />
          </StyledRowContent>
        </li>
      ))}
      <Row className="justify-content-md-center">
        <Col xs lg="1">
          {!allContent?.first ? (
            <Button className="btn btn-sm mt-2" variant="outline-primary"
                    onClick={() => setPage({ number: page.number - 1 })}>
              {'<'}
            </Button>
          ) : null}
        </Col>
        <Col xs lg="1">
          {!allContent?.last ? (
            <Button className="btn btn-sm mt-2 " variant="outline-primary"
                    onClick={() => setPage({ number: page.number + 1 })}>
              {'>'}
            </Button>
          ) : null}
        </Col>
      </Row>
    </StyledContainer>
  );
};
