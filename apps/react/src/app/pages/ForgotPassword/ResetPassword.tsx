import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { forgotpasswordAsync, resetpasswordAsync } from '@internship/store/authentication';
import { getUrlParameter } from '@internship/shared/utils';
import { useTemporary } from '@internship/shared/hooks';
import { Button } from '@internship/ui';

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

const H4 = styled.h4`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const Container = styled.div`
  display: inline-block;
  padding: 4.5rem;
`;

export const ResetPassword = (props) => {
  const resttoken = getUrlParameter('token', props.location.search);
  const error = getUrlParameter('error', props.location.search);
  const { handleSubmit, register, getValues } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [passworderror, setPasswordError] = useState('');
  const [enable, setEnable] = useState(false);
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const onSubmit = (values) => {
    values = { ...values, token: resttoken };
    dispatch(resetpasswordAsync.request(values));
    if (isErrorRequired)
      history.push('/login');
    else{
      setEnable(false);
    }
  };

  const onChange = () => {
    const firstPassword = getValues()['newPassword'];
    const secondPassword = getValues()['newPasswordConfirmation'];
    if (firstPassword !== secondPassword) {
      setPasswordError('Şifre Eşleşmedi');
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      setEnable(false);
    }
   else if (firstPassword.length < 6 || firstPassword.length>20) {
      setPasswordError('Şifre en az 6 en fazla 20 karakter olmalı');
      setEnable(false);
    }
    else if(firstPassword.search(/[A-Z]/)<0){
      setPasswordError('Şifre en az 1 tane büyük harf içermeli');
      setEnable(false);
    }
    else if(firstPassword.search(/[a-z]/)<0){
      setPasswordError('Şifre en az 1 tane küçük harf içermeli');
      setEnable(false);
    }
    else if(firstPassword.search(/[0-9]/)<0){
      setPasswordError('Şifre en az 1 rakam içermeli');
      setEnable(false);
    }
    else {
      setPasswordError('');
      setEnable(true);
    }
  };

  if (resttoken) {
    return (
      <StyledApp>
        <form onSubmit={handleSubmit(onSubmit)}>
          <H4>Reset Password ?</H4>
          <Container>
            <StyledRow>
              <div className="col-4">
                <label>New Password</label>
              </div>
              <div className="col-8">
                <input
                  className={passworderror ? 'form-control is-invalid' : 'form-control'}
                  type="password"
                  name="newPassword"
                  onChange={onChange}
                  ref={register({ required: true })}
                />
                <div className="invalid-feedback">{passworderror}</div>
              </div>
            </StyledRow>
            <StyledRow>
              <div className="col-4">
                <label>Repeate Password</label>
              </div>
              <div className="col-8">
                <input
                  className={passworderror ? 'form-control is-invalid' : 'form-control'}
                  type="password"
                  name="newPasswordConfirmation"
                  onChange={onChange}
                  ref={register({ required: true })}
                />
                <div className="invalid-feedback">{passworderror}</div>
              </div>
            </StyledRow>
            {isErrorRequired ? (
              <>
                <div className="alert alert-danger">{isErrorRequired}</div>
              </>
            ) : null}
            {isSuccessRequired ? (
              <>
                <div className="alert alert-success">{isSuccessRequired}</div>
              </>
            ) : null}
            <Button variant="outline-primary" type="submit" disabled={!enable}>
              Confirm Password
            </Button>
          </Container>
        </form>
      </StyledApp>
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            from: props.location,
            error: error,
          },
        }}
      />
    );
  }
};
