import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { api, Pageable } from '@internship/shared/api';
import { Button } from '@internship/ui';

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

};

export const MyContents: React.FC<MyContentsProps> = ({}) => {
  const [page, setPage] = useState({ number: 0 });
  const [myContents, setMyContents] = useState<Pageable>();
  useEffect(() => {
    api.auth
      .myContents(page.number)
      .then((r) => setMyContents(r))
      .catch((e) => console.error(e));
  }, [page]);


  return (
    <StyledContainer>
      <StyledRow>
        {myContents?.content?.map((d, key) => (
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
      <Row className="justify-content-md-center">
        <Col xs lg="1">
          {!myContents?.first ? (
            <Button className="btn btn-sm mt-2" variant="outline-primary"
                    onClick={() => setPage({ number: page.number - 1 })}>
              {'<'}
            </Button>
          ) : null}
        </Col>
        <Col xs lg="1">
          {!myContents?.last ? (
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
