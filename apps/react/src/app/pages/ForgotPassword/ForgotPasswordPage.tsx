import styled from 'styled-components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { forgotpasswordAsync } from '@internship/store/authentication';
import { useHistory } from 'react-router-dom';
import { useError } from '@internship/shared/hooks';

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

export const ForgotPasswordPage = () => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isErrorRequired } = useError();
  const onChange = (event) => {
    const { name } = event.target;
    if (name === 'email') {
      window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    }
  };

  const onSubmit = (values) => {
    dispatch(forgotpasswordAsync.request(values));
    if (isErrorRequired) {
      history.push('/');
    }
  };

  return (
    <StyledApp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H4>Forgot Password ?</H4>
        <Container>
          <StyledRow>
            <div className="col-4">
              <label>The mail address of the account to be recovered</label>
            </div>
            <div className="col-8">
              <input className="form-control" type="text" name="email" onChange={onChange} ref={register({ required: true })} />
            </div>
          </StyledRow>
          {isErrorRequired ? (
            <>
              <div className="alert alert-danger">{isErrorRequired}</div>
            </>
          ) : null}
          <Button type="submit">New Password</Button>
        </Container>
      </form>
    </StyledApp>
  );
};
