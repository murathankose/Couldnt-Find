import React from 'react';
import { faChevronCircleDown, faFrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Alert, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { api } from '@internship/shared/api';
import { Button } from '@internship/ui';
import { useTemporary } from '@internship/shared/hooks';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const StyledIcon = styled(FontAwesomeIcon)`
  color: red;
  margin-right: 1rem;
  margin-top: 1rem;
  margin-left: 1rem;
  font-size: 2rem;
`;

const StyledH2 = styled.h2`
  margin-top: 2rem;
  text-align-last: center;
  color: blueviolet;
`;

const StyledDiv = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const StyledInput = styled.input`
  width: inherit;
  max-width: 70%;
`;

const StyledRow = styled(Row)`
  flex-wrap: wrap;
  display: flex;
  text-align-last: center;
  margin-top: 2rem;
  justify-content: center;
`;

export const MailErrorPage = () => {
  const { handleSubmit, register } = useForm();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const dispatch = useDispatch();

  const onSubmit = (value) => {
    api.auth
      .sendActivation(value.email)
      .then((r) => console.log(r + ' deneme'))
      .catch((e) => console.error(e));
  };

  const onChange = (event) => {
    const { name } = event.target;
    if (name === 'email') {
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    }
  };

  return (
    <Container>
      <StyledH2>
        <StyledIcon icon={faFrown} />
        Üzgünüz, bir hata meydana geldi.
        <StyledIcon icon={faFrown} />
      </StyledH2>

      <StyledH2>Tekrardan aktivasyon kodu almak için lütfen mailinizi giriniz</StyledH2>
      <StyledDiv>
        <StyledIcon icon={faChevronCircleDown} />
      </StyledDiv>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledRow>
          <div className="col-2">
            <label>User Name:</label>
          </div>
          <div className="col-10 ">
            <StyledInput placeholder="Enter your e-mail" type="email" onChange={onChange} name="email" ref={register({ required: true })} />
          </div>
        </StyledRow>
        <StyledRow>
          <Button variant="outline-primary" type="submit">
            Aktivasyon Kodu İste
          </Button>
        </StyledRow>
        {isErrorRequired ? (
          <StyledDiv >
            <Alert variant="danger">{isErrorRequired}</Alert>

            <Link type="button" to="/register" onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
              <Button>Kayıt Ol</Button>
            </Link>
          </StyledDiv>
        ) : null}
        {isSuccessRequired ?(
          <StyledDiv >
            <Alert variant="success">{isSuccessRequired}</Alert>
            <Link type="button" to="/login" onClick={() => dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null })}>
              <Button>Giriş Yap</Button>
            </Link>
          </StyledDiv>
        ):null }
      </form>
    </Container>
  );
};
