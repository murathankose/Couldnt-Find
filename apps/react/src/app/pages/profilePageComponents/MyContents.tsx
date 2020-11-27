import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { api, Pageable } from '@internship/shared/api';
import { Button } from '@internship/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAccessToken } from '@internship/shared/utils';
import { useTemporary } from '@internship/shared/hooks';

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
  background-color: red;
  color: white;
  border-color: red;
  font-size: 0.7rem;
  margin-left: 1rem;
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
const StyledContainer = styled(Container)`
  margin-top:1.5rem;
`;

type MyContentsProps = {};

export const MyContents: React.FC<MyContentsProps> = ({}) => {
  const [page, setPage] = useState({ number: 0 });
  const [myContents, setMyContents] = useState<Pageable>();
  const { isSuccessRequired } = useTemporary();

  useEffect(() => {
    api.auth
      .myContents(page.number, 4)
      .then((r) => setMyContents(r))
      .catch((e) => console.error(e));
  }, [page, isSuccessRequired]);

  const deleteContent = (contentId, topicId) => {
    const accessToken = getAccessToken();
    api.auth.deleteContent(`Bearer ${accessToken}`, contentId, topicId).catch((e) => console.error(e));
  };
  return (
    <StyledContainer>
      <div className="card">
        <div className="card-header">
          <h4>
            <b className="text-black-50">İçeriklerim</b>
          </h4>
        </div>
        {myContents?.content?.map((d, key) => (
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
                  <StyledDown>
                    <StyledStrong>{d.createDate.substring(0, 10)}</StyledStrong>
                    <StyledStrong>{d.createDate.substring(11, 16)}</StyledStrong>
                    <StyledUserName to={'/user/' + d.user.username}>{d.user.username}</StyledUserName>
                    <StyledLikeButton className="btn btn-danger my-2"
                                      onClick={() => deleteContent(d.id, d.topic.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </StyledLikeButton>
                  </StyledDown>
                </StyledRow>
              </li>
            </ul>
          </div>
        ))}
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
      </div>
    </StyledContainer>
  );
};
