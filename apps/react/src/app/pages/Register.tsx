import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { registerAsync } from '@internship/store/authentication';
import { Link, useHistory } from 'react-router-dom';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';

const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
`;
const StyledRow = styled(Row)`
  margin-bottom: 1rem;
`;
const Button = styled.button`
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  background-color: #007bff;
`;
const H4 = styled.h4`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const Container = styled.div`
  display: inline-block;
  border: ridge;
  padding: 4.5rem;
`;
export const Register = () => {
  const { handleSubmit, register, errors } = useForm<Inputs>();
  const dispatch = useDispatch();
  const { isErrorRequired } = useTemporary();
  const history = useHistory();
  const { isAuthenticated } = useAuthentication();

  const onSubmit = (values) => {
    dispatch(registerAsync.request(values));
    history.push('/login');
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  const onChange = (event) => {
    const { name } = event.target;
    if (name === 'username' || name === 'password') {
      window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    }
  };

  type Inputs = {
    username: string,
    email: string,
    password: string,
  };

  return (
    <StyledApp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H4>Enter your information to create an account.</H4>
        <Container>
          <StyledRow>
            <div className="col-4">
              <label>User Name:</label>
            </div>
            <div className="col-8">
              <input type="text" name="username" onChange={onChange} ref={register({ required: true })} />
              {errors.username &&
              <span>
              <Alert variant="danger">Required</Alert>
            </span>}
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-4">
              <label>E-mail:</label>
            </div>
            <div className="col-8">
              <input type="email" name="email" onChange={onChange} ref={register({ required: true })} />
              {errors.username &&
              <span>
                <Alert variant="danger">Required</Alert>
              </span>}
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-4">
              <label>Password:</label>
            </div>
            <div className="col-8">
              <input type="password" name="password" onChange={onChange} ref={register({ required: true })} />
              {errors.username &&
              <span>
                <Alert variant="danger">Required</Alert>
              </span>}
            </div>
            {isErrorRequired ? <Alert variant="danger">{isErrorRequired}</Alert> : null}
          </StyledRow>
          <StyledRow>
            <p>Already have an account. </p>
            <Link to="/login">Sign in</Link>
          </StyledRow>
          <Button type="submit">Submit</Button>
        </Container>
      </form>
    </StyledApp>
  );
};
