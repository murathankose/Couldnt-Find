import React from 'react';
import { Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  margin-bottom: 0.5rem;
`;

const StyledContent = styled(StyledStrong)`
  color: blueviolet;
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  color: blueviolet;
`;

type MyContentsProps = {
  myContents;
};

export const MyContents: React.FC<MyContentsProps> = ({ myContents }) => {
  return (
    <StyledContainer>
      <StyledRow>
        {myContents?.map((d, key) => (
          <li style={{ listStyleType: 'none' }} key={key} className="ml-4">
            <StyledRowContent>
              <StyledStrong>
                Konu Adı : <StyledLink to={'/contents/' + d.topic.topicName}>{d.topic.topicName}</StyledLink>
              </StyledStrong>
              <br />
              <StyledContent> {d.content} </StyledContent>
              <br />
              <StyledStrong>
                Like: <StyledContent>{d.like} </StyledContent>Dislike: <StyledContent>{d.dislike}</StyledContent>
              </StyledStrong>
              <StyledStrong>
                Tarih :<StyledContent> {d.createDate.substring(0, 10)}</StyledContent>
              </StyledStrong>
              <StyledStrong>
                Saat :<StyledContent> {d.createDate.substring(11, 16)}</StyledContent>
              </StyledStrong>
            </StyledRowContent>
          </li>
        ))}
      </StyledRow>
    </StyledContainer>
  );
};
