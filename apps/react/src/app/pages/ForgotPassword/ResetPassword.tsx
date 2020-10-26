import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { forgotpasswordAsync, resetpasswordAsync } from '@internship/store/authentication';

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

export const ResetPassword = (props) => {
  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(props.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  const { handleSubmit, register, getValues } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [passworderror, setPasswordError] = useState('');
  const [enable, setEnable] = useState(true);
  const resttoken = getUrlParameter('token');
  const error = getUrlParameter('error');
  console.log('resttoken' + resttoken);
  console.log('errror' + error);
  const onSubmit = (values) => {
    values = { ...values, token: resttoken };
    dispatch(resetpasswordAsync.request(values));
    history.push('/');
  };

  const onChange = () => {
    const firstPassword = getValues()['newPassword'];
    const secondPassword = getValues()['newPasswordConfirmation'];
    if (firstPassword !== secondPassword) {
      setPasswordError('Şifre Eşleşmedi');
    } else {
      setPasswordError('');
      setEnable(false);
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
            <Button type="submit" disabled={enable}>
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
