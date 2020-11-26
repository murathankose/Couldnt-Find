import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { api, Pageable } from '@internship/shared/api';
import { Button } from '../../atoms/Button';

const StyledContainer = styled(Container)`
  margin-top: 1.5rem;
`;
const StyledRow = styled(Row)`
  flex-flow: row;
`;

const StyledDown = styled.p`
  color: blueviolet;
  margin-left: 1rem;
  align-self: center;
  font-weight: 200;
  margin-bottom: unset;
`;

const StyledContent = styled.strong`
  color: blueviolet;
  margin-left: 1rem;
  align-self: center;
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
const StyledStrong = styled.strong`
  margin-right: 1rem;
`;

const StyledLink = styled(Link)`
  font-weight: 700;
  font-size: large;
  color: initial;
`;

const StyledUserName = styled(Link)`
  font-weight: 600;
  color: blueviolet;
  display: block;
`;

type ContentLikeInfoViewProps = {
  id: string;
  likeOrDislike;
};

export const ContentLikeInfoView: React.FC<ContentLikeInfoViewProps> = ({ id, likeOrDislike }) => {
  const [likeUser, setLikeUser] = useState<Pageable>();
  const [dislikeUser, setDislikeUser] = useState<Pageable>();
  const [pageLike, setPageLike] = useState({ number: 0 });
  const [pageDislike, setPageDislike] = useState({ number: 0 });

  useEffect(() => {
    api.auth
      .getLikesUser(id, pageLike.number)
      .then((r) => {
        setLikeUser(r);
      })
      .catch((e) => console.error(e));
  }, [pageLike, id]);

  useEffect(() => {
    api.auth
      .getDislikesUser(id, pageDislike.number)
      .then((r) => {
        setDislikeUser(r);
      })
      .catch((e) => console.error(e));
  }, [pageDislike, id]);
  return (
    <div className="card">
      <div className="card-header">
        <h4>{likeOrDislike ? <b className="text-black-50">Beğenenler</b> :
          <b className="text-black-50">Beğenmeyenler</b>}</h4>
      </div>
      {(likeOrDislike ? likeUser?.content : dislikeUser?.content)?.map((d, key) => (
        <div key={key}>
          <ul className="list-group list-group-flush">
            <li key={key} className="list-group-item ">
              <StyledRow>
                <StyledDown>
                  <StyledUserName to={'/user/' + d.user.username}>{d.user.username}</StyledUserName>
                  <StyledStrong>{d.likeDate.substring(0, 10)}</StyledStrong>
                  <StyledStrong>{d.likeDate.substring(11, 16)}</StyledStrong>
                </StyledDown>
              </StyledRow>
            </li>
          </ul>
        </div>
      ))}
      {likeOrDislike ? (
        <Row className="justify-content-md-center">
          <Col xs lg="1">
            {!likeUser?.first ? (
              <Button className="btn btn-sm mt-2" variant="outline-primary"
                      onClick={() => setPageLike({ number: pageLike.number - 1 })}>
                {'<'}
              </Button>
            ) : null}
          </Col>
          <Col xs lg="1">
            {!likeUser?.last ? (
              <Button className="btn btn-sm mt-2 " variant="outline-primary"
                      onClick={() => setPageLike({ number: pageLike.number + 1 })}>
                {'>'}
              </Button>
            ) : null}
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-md-center">
          <Col xs lg="1">
            {!dislikeUser?.first ? (
              <Button className="btn btn-sm mt-2" variant="outline-primary"
                      onClick={() => setPageDislike({ number: pageDislike.number - 1 })}>
                {'<'}
              </Button>
            ) : null}
          </Col>
          <Col xs lg="1">
            {!dislikeUser?.last ? (
              <Button className="btn btn-sm mt-2 " variant="outline-primary"
                      onClick={() => setPageDislike({ number: pageDislike.number + 1 })}>
                {'>'}
              </Button>
            ) : null}
          </Col>
        </Row>
      )}
    </div>
  );
};
