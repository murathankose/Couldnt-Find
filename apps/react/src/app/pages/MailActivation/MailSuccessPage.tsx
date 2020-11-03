import React from 'react';
import { faCheck, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const StyledIcon = styled(FontAwesomeIcon)`
  color: green;
  margin-right: 1rem;
  margin-left: 1rem;
`;

const StyledH2 = styled.h2`
  margin-top: 2rem;
  text-align-last: center;
  color: blue;
`;

export const MailSuccessPage = () => {
  return (
    <Container>
      <StyledH2>
        <StyledIcon icon={faCheck} />
        Mailiniz Başarı ile Aktive edilmiştir.
        <StyledIcon icon={faCheck} />
      </StyledH2>

      <StyledH2>
        Giriş Yapmak için{' '}
        <Link to="/login">
          <StyledIcon icon={faChevronCircleRight} />
        </Link>
      </StyledH2>
    </Container>
  );
};
