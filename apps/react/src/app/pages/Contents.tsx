import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { api, ContentResponse } from '@internship/shared/api';
import { faPlus, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Button, ContentForm } from '@internship/ui';
import { useAuthentication } from '@internship/shared/hooks';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { likeAsync } from '@internship/store/authentication';

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

export const Contents = () => {
  const { topicName } = useParams();
  const [allContent, setAllContent] = useState<ContentResponse[]>();
  const [updateContent, setUpdateContent] = useState(false);
  const [newContent, setNewContent] = useState(false);
  const { isAuthenticated } = useAuthentication();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    api.auth
      .getContent(topicName)
      .then((r) => {
        setAllContent(r);
      })
      .catch((e) => console.error(e));
    setUpdateContent(false);
  }, [updateContent]);

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
        <ContentForm setClose={setNewContent} setUpdateContents={setUpdateContent} topicName={topicName} /> : null}
      {allContent?.map((d, key) => (
        <li key={key} className="ml-4">
          <StyledRowContent>
            <StyledStrong>{d.content}</StyledStrong>
            <br />
            <StyledStrong>Kullanıcı:</StyledStrong> <StyledLink
            to={'/user/' + d.topic.user.username}>{d.topic.user.username}</StyledLink>
            <br />
            <StyledNewButton onClick={() => addLike(d.id, 'like')} disabled={like}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </StyledNewButton>
            <StyledNewButton onClick={() => addLike(d.id, 'dislike')} disabled={dislike}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </StyledNewButton>
            <br />
            <StyledStrong>Tarih : {d.createDate.substring(0, 10)}</StyledStrong>
            <StyledStrong>Saat : {d.createDate.substring(11, 16)}</StyledStrong>
            <br />
          </StyledRowContent>
        </li>
      ))}
    </StyledContainer>
  );
};
