import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginAsync } from '@internship/store/authentication';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { Button, Captcha,Input } from '@internship/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash/fp';

const StyledAnchorTag = styled.a`
  font-weight: 400;
  font-size: 16px;
`;
const StyledP = styled.p`
  color: #bf1650;
`;
const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const StyledRow = styled(Row)`
  margin-bottom: 1rem;
`;

const H4 = styled.h4`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const Container = styled.div`
  display: inline-block;
  padding: 4.5rem;
`;

export const Login = () => {
  const { handleSubmit, register, errors } = useForm<Inputs>();
  const { isCaptchaRequired, isErrorRequired, isSuccessRequired } = useTemporary();
  const { isAuthenticated } = useAuthentication();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (values) => {
    dispatch(loginAsync.request(values));
  };

  const onChange = (event) => {
    const { name } = event.target;
    if (name === 'username' || name === 'password') {
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    }
  };

  useEffect(() => {
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  }, [isSuccessRequired]);

  useEffect(() => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  type Inputs = {
    username: string;
    password: string;
  };

  return (
    <StyledApp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H4 className="text text-center">Enter your information to log into your account.</H4>
        <Container>
          <StyledRow>
            <div className="col-4 mt-2">
              <label>User Name</label>
            </div>
            <div className="col-8 ">
              <Input
                className={errors.username ? 'form-control is-invalid' : 'form-control'}
                placeholder="Enter username"
                type="text"
                name="username"
                onChange={onChange}
                ref={register({ required: true })}
                errors={errors}
              />
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-4 mt-2 ml-n1">
              <label>Password</label>
            </div>
            <div className="col-8 ml-sm-1">
              <Input
                className={errors.password ? 'form-control is-invalid' : 'form-control'}
                placeholder="Enter password"
                type="password"
                name="password"
                onChange={onChange}
                ref={register({ required: true })}
                errors={errors}
              />
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-5   ml-n1">
              <label htmlFor="rememberMe"> Remember me</label>
            </div>
            <div className="col-3  ml-n5">
              <input type="checkbox" name="rememberMe" onChange={onChange} ref={register({ required: false })} />
            </div>
          </StyledRow>
          {isCaptchaRequired ? (
            <StyledRow>
              <div className="col-8">
                <Captcha name="captcha" ref={register({ required: true })} />
              </div>
            </StyledRow>
          ) : null}
          {isErrorRequired ? (
            <>
              <Alert variant="danger">{isErrorRequired}</Alert>
              <Link type="button" to="/forgotpassword"
                    onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                Forgot Password ?
              </Link>
            </>
          ) : null}
          <div className="mb-3 mt-3">
            <StyledAnchorTag
              className="btn btn-outline-dark"
              href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:4200/auth"
            >
              <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '10px' }} /> Log in with google
            </StyledAnchorTag>
            <Button className="ml-5" variant="outline-primary" type="submit">
              Login
            </Button>
          </div>
          <StyledRow>
            <div className="col-5 ml-n2">
              <label>No account ?</label>
            </div>
            <div className="col-3">
              <Link to="/register">Sign Up</Link>
            </div>
          </StyledRow>
        </Container>
      </form>
    </StyledApp>
  );
};
