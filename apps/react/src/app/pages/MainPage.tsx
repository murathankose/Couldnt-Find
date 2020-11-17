import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthentication } from '@internship/shared/hooks';
import { Button, TopicForm } from '@internship/ui';
import { api, TopicResponse } from '@internship/shared/api';
import { Link } from 'react-router-dom';

const StyledIcon = styled(FontAwesomeIcon)``;
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

export const MainPage = () => {
  const [newTopic, setNewTopic] = useState(false);
  const { isAuthenticated } = useAuthentication();
  const [allTopics, setAllTopics] = useState<TopicResponse[]>();
  const [updateTopics, setUpdateTopics] = useState(false);

  useEffect(() => {
    api.auth
      .getTopic()
      .then((r) => setAllTopics(r))
      .catch((e) => console.error(e));
    setUpdateTopics(false);
  }, [updateTopics]);

  return (
    <StyledContainer>
      {isAuthenticated ? (
        <StyledRow>
          <StyledNewButton onClick={() => setNewTopic(true)}>
            <StyledIcon icon={faPlus} />
          </StyledNewButton>
        </StyledRow>
      ) : null}
      {newTopic ? <TopicForm setClose={setNewTopic} setUpdateTopics={setUpdateTopics} /> : null}
      {allTopics?.map((d, key) => (
        <li key={key} className="ml-4">
          <StyledRowContent>
            <StyledStrong>Konu Adı:</StyledStrong> <StyledLink
            to={'/contents/' + d.topicName}>{d.topicName}</StyledLink>
            <br />
            <StyledStrong>İçerik sayısı:</StyledStrong> {d.contentNumber}
            <br />
            <StyledStrong>Kullanıcı:</StyledStrong> <StyledLink
            to={'/user/' + d.user.username}>{d.user.username}</StyledLink>
            <br />
            <StyledStrong>Tarih : {' '}{d.createDate.substring(0, 10)}</StyledStrong>
            <StyledStrong>Saat : {' '}{d.createDate.substring(11, 16)}</StyledStrong>
            <br />
          </StyledRowContent>
        </li>
      ))}
    </StyledContainer>
  );
};
