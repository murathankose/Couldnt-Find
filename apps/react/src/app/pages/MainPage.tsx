import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthentication } from '@internship/shared/hooks';
import {
  Button,
  MostLikedContent,
  TopicForm,
  TopicViewOrderByContentNumber,
  TopicViewOrderByCreateDate
} from '@internship/ui';
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
  margin-bottom: 1rem;
`;

const StyledContainer = styled(Container)`
  margin-top: 1.5rem;

`;
const StyledStrong = styled.strong`
  margin-right: 1rem;
`;

const StyledLink = styled(Link)`
  font-weight: 700;
  font-size: large;
  color: initial;
`;

const StyledUl = styled.ul`
  border: solid;
  border-color: blueviolet;
  margin-bottom: 1rem;
`;

const StyledContent = styled(StyledStrong)`
  color: blueviolet;
  font-weight: 500;
  float: right;
`;

export const MainPage = () => {
  const [newTopic, setNewTopic] = useState(false);
  const { isAuthenticated } = useAuthentication();

  const newTopicFunction = () => {
    setNewTopic(true);
  };
  return (
    <StyledContainer>
      {isAuthenticated ? (
        <StyledRow>
          <StyledNewButton onClick={newTopicFunction}>
            <StyledIcon icon={faPlus} />
          </StyledNewButton>
        </StyledRow>
      ) : null}
      <Row></Row>
      {newTopic ? <TopicForm setClose={setNewTopic} /> : null}
      <StyledRow>
        <TopicViewOrderByCreateDate />
        <MostLikedContent />
        <TopicViewOrderByContentNumber />
      </StyledRow>
    </StyledContainer>
  );
};
