import React, { useEffect, useState } from 'react';
import { api, Pageable } from '@internship/shared/api';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import { useTemporary } from '@internship/shared/hooks';

const StyledRow = styled(Row)`
  flex-flow: row;
`;

const StyledContent = styled.strong`
  color: blueviolet;
  margin-left: auto;
  margin-right: 1rem;
  align-self: center;
`;

export const TopicViewOrderByContentNumber = () => {
  const [allTopicsOrderByContentNumber, setAllTopicsOrderByContentNumber] = useState<Pageable>();
  const [page, setPage] = useState({ number: 0 });
  const { isSuccessRequired } = useTemporary();
  useEffect(() => {
    api.auth
      .getTopicOrderByContentNumber(page.number)
      .then((r) => setAllTopicsOrderByContentNumber(r))
      .catch((e) => console.error(e));
  }, [page, isSuccessRequired]);

  return (
    <Col sm={3}>
      <div className="card">
        <div className="card-header">
          <h4>
            <b className="text-black-50">Tartışmalar</b>
          </h4>
        </div>
        {allTopicsOrderByContentNumber?.content?.map((d, key) => (
          <div key={key}>
            <ul className="list-group list-group-flush">
              <li key={key} className="list-group-item ">
                <StyledRow>
                  <Link className="nav-link" to={'/topics/' + d.id}>
                    {d.topicName.length >= 14 ? (d.topicName.substring(0, 14) + '...') : (d.topicName)}
                  </Link>
                  <StyledContent>{d.contentNumber}</StyledContent>
                </StyledRow>
              </li>
            </ul>
          </div>
        ))}
        <Row className="justify-content-md-center">
          <Col xs lg="1">
            {!allTopicsOrderByContentNumber?.first ? (
              <Button className="btn btn-sm mt-2" variant="outline-primary"
                      onClick={() => setPage({ number: page.number - 1 })}>
                {'<'}
              </Button>
            ) : null}
          </Col>
          <Col xs lg="1">
            {!allTopicsOrderByContentNumber?.last ? (
              <Button className="btn btn-sm mt-2 " variant="outline-primary"
                      onClick={() => setPage({ number: page.number + 1 })}>
                {'>'}
              </Button>
            ) : null}
          </Col>
        </Row>
      </div>
    </Col>
  );
};
