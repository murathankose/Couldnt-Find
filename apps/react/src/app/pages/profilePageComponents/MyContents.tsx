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

type MyContentsProps = {
  myContents;
};

export const MyContents: React.FC<MyContentsProps> = ({ myContents }) => {
  return (
    <StyledContainer>
      <StyledRow>
        {myContents?.map((d, key) => (
          <li key={key} className="ml-4">
            <StyledRowContent>
              <StyledStrong>
                Konu Adı :{' '}
                <StyledLink to={'/contents/' + d.topic.topicName}>{d.topic.topicName}</StyledLink>
              </StyledStrong>
              <br />
              <StyledStrong> {d.content} </StyledStrong>
              <br />
              <p>
                Like: {d.like} Dislike: {d.dislike}
              </p>
              <StyledStrong>Tarih : {' '}{d.createDate.substring(0,10)}</StyledStrong>
              <StyledStrong>Saat : {' '}{d.createDate.substring(11,16)}</StyledStrong>
            </StyledRowContent>
          </li>
        ))}
      </StyledRow>
    </StyledContainer>
  );
};
