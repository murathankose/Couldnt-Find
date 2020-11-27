import React, { useEffect, useState } from 'react';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { api, Pageable } from '@internship/shared/api';
import { faHeart, faHeartBroken, faPlus, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Button, ContentForm, ContentLikeInfoView, TopicViewOrderByCreateDate } from '@internship/ui';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { likeAsync } from '@internship/store/authentication';
import { getUserName } from '@internship/shared/utils';

const StyledRow = styled(Row)`
  flex-flow: row;
`;

const StyledContentButton = styled.button`
  border: none;
  background: none;
  margin-left: -1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  &:focus {
    outline: none;
  }
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

const StyledHeartButton = styled(Button)`
  background-color: white;
  color: red;
  border-color: white;
  font-size: 0.7rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  &:hover {
    background-color: white !important;
    color: red !important;
    border-color: white !important;
  }
  &:active {
    background: none !important;
    color: red !important;
    border: none !important;
  }
  &:focus {
    background: none !important;
    color: red !important;
    border: none !important;
    box-shadow: none !important;
  }
`;
const StyledStrong = styled.strong`
  margin-right: 1rem;
`;

const StyledUserName = styled(Link)`
  font-weight: 400;
  color: blueviolet;
`;

const StyledContainer = styled(Container)`
  margin-top: 1.5rem;
`;
const StyledNewButton = styled(Button)`
  margin-left: auto;
  background-color: blueviolet;
  margin-bottom: 1rem;
`;

export const Contents = () => {
  const { topicId } = useParams();
  const [allContent, setAllContent] = useState<Pageable>();
  const [newContent, setNewContent] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [contentId, setContentId] = useState('');
  const [openContentLike, setOpenContentLike] = useState(false);
  const [openContentDislike, setOpenContentDislike] = useState(false);
  const { isAuthenticated } = useAuthentication();
  const dispatch = useDispatch();
  const { isSuccessRequired } = useTemporary();
  const [page, setPage] = useState({ number: 0 });

  useEffect(() => {
    api.auth
      .getContent(topicId, page.number, 7)
      .then((r) => {
        setAllContent(r);
      })
      .catch((e) => console.error(e));
  }, [page, isSuccessRequired, topicId]);

  useEffect(() => {
    api.auth
      .getTopicName(topicId)
      .then((r) => {
        setTopicName(r);
      })
      .catch((e) => console.error(e));
  }, [page, topicId]);

  const addLike = (contentID, likes) => {
    const values = { contentID: contentID, like: likes };
    dispatch(likeAsync.request(values));
  };

  const likesUser = (id, like) => {
    setContentId(id);
    if (like) {
      setOpenContentDislike(false);
      setOpenContentLike(true);
    } else {
      setOpenContentLike(false);
      setOpenContentDislike(true);
    }
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
      {newContent ? <ContentForm setClose={setNewContent} topicName={topicName} topicId={topicId} /> : null}
      <Row>
        <TopicViewOrderByCreateDate />
        <Col sm={5}>
          <div className="card">
            <div className="card-header">
              <h4>
                <b className="text-black-50">En Beğenilen İçerikler</b>
              </h4>
            </div>
            {allContent?.content?.map((d, key) => (
              <div key={key}>
                <ul className="list-group list-group-flush">
                  <li key={key} className="list-group-item ">
                    <Accordion>
                      <StyledRow>
                        <Accordion.Toggle as={StyledContentButton} variant="link" eventKey="0">
                          <StyledContent>{d.content}</StyledContent>
                        </Accordion.Toggle>
                      </StyledRow>
                      <StyledRow>
                        <Accordion.Collapse style={{ marginTop: '-1.5rem', marginBottom: '-1.5rem' }} eventKey="0">
                          <Card.Body>
                            <StyledRow style={{ marginLeft: '-2rem' }}>
                              <StyledHeartButton onClick={() => likesUser(d.id, true)}>
                                <FontAwesomeIcon icon={faHeart} />
                              </StyledHeartButton>
                              <StyledContent style={{ marginLeft: '0rem' }}>{d.like}</StyledContent>
                              <StyledHeartButton onClick={() => likesUser(d.id, false)}>
                                <FontAwesomeIcon icon={faHeartBroken} />
                              </StyledHeartButton>
                              <StyledContent style={{ marginLeft: '0rem' }}>{d.dislike}</StyledContent>
                            </StyledRow>
                          </Card.Body>
                        </Accordion.Collapse>
                      </StyledRow>
                    </Accordion>
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
          </div>
        </Col>
        <Col sm={3}>
          {(openContentLike || openContentDislike) ?
            (openContentLike ? (<ContentLikeInfoView id={contentId} likeOrDislike={true} />) :
              (<ContentLikeInfoView id={contentId} likeOrDislike={false} />)) : null}
        </Col>
      </Row>
    </StyledContainer>
  );
};
