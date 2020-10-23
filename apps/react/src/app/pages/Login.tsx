import styled from 'styled-components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '@internship/store/authentication';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { Captcha } from '@internship/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const StyledAnchorTag = styled.a`
  margin-bottom: 15px;
  margin-top: 7px;
  font-weight: 400;
  font-size: 16px;
`;

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
  padding: 4.5rem;
`;

export const Login = (context) => {
  const { handleSubmit, register } = useForm();
  const { isCaptchaRequired } = useTemporary();
  const { isAuthenticated } = useAuthentication();
  const isErrorRequired = useSelector((store) => store.temp?.errorRequired);
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (values) => {
    dispatch(loginAsync.request(values));
    if (!isAuthenticated&&isErrorRequired) {
      history.push('/');
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username' || name === 'password') {
      window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    }
  };
  return (
    <StyledApp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H4>Enter your information to log into your account.</H4>
        <Container>
          <StyledRow>
            <div className="col-4">
              <label>User Name:</label>
            </div>
            <div className="col-8">
              <input className="form-control" type="text" name="username" onChange={onChange} ref={register({ required: true })} />
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-4">
              <label>Password:</label>
            </div>
            <div className="col-8">
              <input className="form-control" type="password" name="password" onChange={onChange} ref={register({ required: true })} />
            </div>
          </StyledRow>
          {isCaptchaRequired ? (
            <StyledRow>
              <div className="col-8">
                <Captcha name="captcha" ref={register({ required: true })} />
              </div>
            </StyledRow>
          ) : null}
          {isErrorRequired ? <div className="alert alert-danger">{isErrorRequired}</div> : null}
          <StyledRow>
            <p>No account?</p>
            <Link href="/register">Sign Up</Link>
          </StyledRow>
          <Button type="submit">Submit</Button>
          <StyledAnchorTag
            className="btn btn-block btn-info"
            href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:4200/auth"
          >
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '10px' }} /> Log in with google
          </StyledAnchorTag>
        </Container>
      </form>
    </StyledApp>
  );
};
