import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { registerAsync } from '@internship/store/authentication';
import { Button, Input, Popup, PopupButton } from '@internship/ui';
import React, { useEffect, useState } from 'react';
import { Alert, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
`;
const StyledRow = styled(Row)`
  margin-bottom: 1rem;
`;
const StyledP = styled.p`
  color: #bf1650;
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
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const history = useHistory();
  const { isAuthenticated } = useAuthentication();
  const [show, setShow] = useState(false);
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
            <div className="col-4 mt-2 ml-n3">
              <label>E-mail</label>
            </div>
            <div className="col-8 ml-sm-3">
              <Input
                className={errors.email ? 'form-control is-invalid' : 'form-control'}
                placeholder="Enter email"
                type="email"
                name="email"
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
                ref={register({
                  required: true,
                  maxLength: { value: 20, message: 'Password cannot exceed 20 characters' },
                  minLength: { value: 6, message: 'Password cannot be less than 6 characters' },
                  pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Your password can contain the characters A-Z, a-z, and 0-9.' },
                  validate: (input) =>
                    /^(?=.{6,20}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/.test(input)
                      ? null
                      : 'Your password must contain numbers, uppercase and lowercase letters.',
                })}
                errors={errors}
              />
            </div>
          </StyledRow>
          <div className="mr-auto">{isErrorRequired ? <Alert variant="danger">{isErrorRequired}</Alert> : null}</div>
          <div className="mb-3 mt-3">
            <Button variant="outline-primary" type="submit">
              Register
            </Button>
          </div>
          <StyledRow>
            <div className="col-5 ml-sm-1">
              <label>Already have an account.</label>
            </div>
            <div className="col-3">
              <Link to="/login">Sign in</Link>
            </div>
          </StyledRow>
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
