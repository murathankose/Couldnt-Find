import React, { useEffect, useState } from 'react';
import { api, Pageable } from '@internship/shared/api';
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import { useTemporary } from '@internship/shared/hooks';

const StyledRow = styled(Row)`
  flex-flow: row;
`;

const StyledContent = styled.p`
  color: blueviolet;
  margin-left: auto;
  margin-right: 1rem;
  margin-bottom: auto;
  margin-top: auto;
  font-size: small;
`;

export const TopicViewOrderByCreateDate = () => {
  const { topicId } = useParams();
  const [allTopicsOrderByCreateDate, setAllTopicsOrderByCreateDate] = useState<Pageable>();
  const [page, setPage] = useState({ number: 0 });
  const { isSuccessRequired } = useTemporary();
  useEffect(() => {
    api.auth
      .getTopic(page.number)
      .then((r) => setAllTopicsOrderByCreateDate(r))
      .catch((e) => console.error(e));
  }, [page, isSuccessRequired, topicId]);

  return (
    <Col sm={4}>
      <div className="card">
        <div className="card-header">
          <h4>
            <b className="text-black-50">En son Eklenen Konular</b>
          </h4>
        </div>
        {allTopicsOrderByCreateDate?.content?.map((d, key) => (
          <div key={key}>
            <ul className="list-group list-group-flush">
              <li key={key} className="list-group-item ">
                <StyledRow>
                  <Link className="nav-link" to={'/topics/' + d.id}>
                    {d.topicName.length >= 13 ? d.topicName.substring(0, 13) + '...' : d.topicName}
                  </Link>
                  <StyledContent>
                    {d.createDate.substring(0, 10)} {d.createDate.substring(11, 16)}
                  </StyledContent>
                </StyledRow>
              </li>
            </ul>
          </div>
        ))}
        <Row className="justify-content-md-center">
          <Col xs lg="1">
            {!allTopicsOrderByCreateDate?.first ? (
              <Button className="btn btn-sm mt-2" variant="outline-primary"
                      onClick={() => setPage({ number: page.number - 1 })}>
                {'<'}
              </Button>
            ) : null}
          </Col>
          <Col xs lg="1">
            {!allTopicsOrderByCreateDate?.last ? (
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
