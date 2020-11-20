import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { Button, TopicForm } from '@internship/ui';
import { api, Pageable } from '@internship/shared/api';
import { Link } from 'react-router-dom';

const StyledIcon = styled(FontAwesomeIcon)``;
const StyledRow = styled(Row)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const StyledRowContent = styled(StyledRow)`
  display: block;
  margin-bottom: 1rem;
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
  color: blueviolet;
`;

const StyledContent = styled(StyledStrong)`
  color: blueviolet;
  font-weight: 500;
`;

export const MainPage = () => {
  const [newTopic, setNewTopic] = useState(false);
  const { isAuthenticated } = useAuthentication();
  const [allTopics, setAllTopics] = useState<Pageable>();
  const [page, setPage] = useState({ number: 0 });
  const { isSuccessRequired } = useTemporary();

  useEffect(() => {
    api.auth
      .getTopic(page.number)
      .then((r) => setAllTopics(r))
      .catch((e) => console.error(e));
  }, [page, isSuccessRequired]);
  return (
    <StyledContainer>
      {isAuthenticated ? (
        <StyledRow>
          <StyledNewButton onClick={() => setNewTopic(true)}>
            <StyledIcon icon={faPlus} />
          </StyledNewButton>
        </StyledRow>
      ) : null}
      {newTopic ? <TopicForm setClose={setNewTopic} setPage={setPage} /> : null}
      {allTopics?.content?.map((d, key) => (
        <li style={{ listStyleType: 'none' }} key={key} className="ml-4">
          <StyledRowContent>
            <StyledStrong>Konu Adı:</StyledStrong> <StyledLink
            to={'/contents/' + d.topicName}>{d.topicName}</StyledLink>
            <br />
            <StyledStrong>İçerik sayısı:</StyledStrong> <StyledContent>{d.contentNumber}</StyledContent>
            <br />
            <StyledStrong>Kullanıcı:</StyledStrong> <StyledLink
            to={'/user/' + d.user.username}>{d.user.username}</StyledLink>
            <br />
            <StyledStrong>
              Tarih : <StyledContent>{d.createDate.substring(0, 10)}</StyledContent>
            </StyledStrong>
            <StyledStrong>
              Saat : <StyledContent>{d.createDate.substring(11, 16)}</StyledContent>
            </StyledStrong>
            <br />
          </StyledRowContent>
        </li>
      ))}
      <Row className="justify-content-md-center">
        <Col xs lg="1">
          {!allTopics?.first ? (
            <Button className="btn btn-sm mt-2" variant="outline-primary"
                    onClick={() => setPage({ number: page.number - 1 })}>
              {'<'}
            </Button>
          ) : null}
        </Col>
        <Col xs lg="1">
          {!allTopics?.last ? (
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
