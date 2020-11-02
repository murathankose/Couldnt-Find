import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { registerAsync } from '@internship/store/authentication';
import { Link, useHistory } from 'react-router-dom';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { Button, Popup, PopupButton } from '@internship/ui';

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
export const Register = () => {
  const { handleSubmit, register, errors } = useForm<Inputs>();
  const dispatch = useDispatch();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const history = useHistory();
  const { isAuthenticated } = useAuthentication();
  const [show, setShow] = useState(false);
  const [btnEnable,setBtnEnable]=useState(true);
  const [passworderror, setPasswordError] = useState('');
  const onSubmit = (values) => {
    dispatch(registerAsync.request(values));
  };

  const checkSubmit = () => {
    setShow(false);
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    history.push('/');
  };
  useEffect(() => {
    setShow(true);
  }, [isSuccessRequired]);

  useEffect(() => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    if (isAuthenticated && !show) {
      history.push('/');
    }
  }, [isAuthenticated]);

  const onChange = (event) => {
    const { name } = event.target;
    if (name === 'username' || name === 'password') {
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    }
    if (name === 'password') {
      const firstPassword = event.target.value;
      if (firstPassword.length < 6 || firstPassword.length>20) {
        setPasswordError('Şifre en az 6 en fazla 20 karakter olmalı');
        setBtnEnable(true);
      }
      else if(firstPassword.search(/[A-Z]/)<0){
        setPasswordError('Şifre en az 1 tane büyük harf içermeli');
        setBtnEnable(true);
      }
      else if(firstPassword.search(/[a-z]/)<0){
        setPasswordError('Şifre en az 1 tane küçük harf içermeli');
        setBtnEnable(true);
      }
      else if(firstPassword.search(/[0-9]/)<0){
        setPasswordError('Şifre en az 1 rakam içermeli');
        setBtnEnable(true);
      }
      else {
        setPasswordError('');
        setBtnEnable(false);
      }
    }
    if (name === 'password') {
      const firstPassword = event.target.value;
      if (firstPassword.length < 6 || firstPassword.length>20) {
        setPasswordError('Şifre en az 6 en fazla 20 karakter olmalı');
        setBtnEnable(true);
      }
      else if(firstPassword.search(/[A-Z]/)<0){
        setPasswordError('Şifre en az 1 tane büyük harf içermeli');
        setBtnEnable(true);
      }
      else if(firstPassword.search(/[a-z]/)<0){
        setPasswordError('Şifre en az 1 tane küçük harf içermeli');
        setBtnEnable(true);
      }
      else if(firstPassword.search(/[0-9]/)<0){
        setPasswordError('Şifre en az 1 rakam içermeli');
        setBtnEnable(true);
      }
        else {
        setPasswordError('');
        setBtnEnable(false);
      }
    }
  };

  type Inputs = {
    username: string;
    email: string;
    password: string;
  };
  return (
    <StyledApp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H4 className="text text-center">Enter your information to create an account.</H4>
        <Container>
          <StyledRow>
            <div className="col-4 mt-2">
              <label>User Name</label>
            </div>
            <div className="col-8">
              <input
                className={errors.username ? 'form-control is-invalid' : 'form-control'}
                placeholder="Enter username"
                type="text"
                name="username"
                onChange={onChange}
                ref={register({ required: true })}
              />
              {errors.email && (
                <div className="invalid-feedback">Enter your email</div>
              )}
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-4 mt-2 ml-n3">
              <label>E-mail</label>
            </div>
            <div className="col-8 ml-sm-3">
              <input
                className={errors.email ? 'form-control is-invalid' : 'form-control'}
                placeholder="Enter email"
                type="email"
                name="email"
                onChange={onChange}
                ref={register({ required: true })}
              />
              {errors.username && (
                <div className="invalid-feedback">Enter your username</div>
              )}
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-4 mt-2 ml-n1">
              <label>Password</label>
            </div>
            <div className="col-8 ml-sm-1">
              <input
                className={passworderror ? 'form-control is-invalid' : 'form-control'}
                placeholder="Enter password"
                type="password"
                name="password"
                onChange={onChange}
                ref={register({ required: true })}
              />
              <div className="invalid-feedback">{passworderror}</div>
              {errors.username && (
                <span>
                  <Alert variant="danger">Required</Alert>
                </span>
              )}
            </div>
          </StyledRow>
          <StyledRow>
            <div className="mr-auto">
              {isErrorRequired ? <Alert variant="danger">{isErrorRequired}</Alert> : null}
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-5 ml-sm-1">
              <label>Already have an account.</label>
            </div>
            <div className="col-3">
              <Link to="/login">Sign in</Link>
            </div>
          </StyledRow>
          <Button variant="outline-primary" disabled={btnEnable} type="submit">
            Submit
          </Button>
          {isSuccessRequired ? (
            <Popup show={show} onHide={checkSubmit}>
              {isSuccessRequired}
              <PopupButton variant="primary" onClick={checkSubmit}>
                Submit
              </PopupButton>
            </Popup>
          ) : null}
        </Container>
      </form>
    </StyledApp>
  );
};
