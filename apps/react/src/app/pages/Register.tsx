import styled from 'styled-components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { registerAsync } from '@internship/store/authentication';

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
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(registerAsync.request(values));
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
              <input type="text" name="username" ref={register({ required: true })} />
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-4">
              <label>E-mail:</label>
            </div>
            <div className="col-8">
              <input type="email" name="email" ref={register({ required: true })} />
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-4">
              <label>Password:</label>
            </div>
            <div className="col-8">
              <input type="password" name="password" ref={register({ required: true })} />
            </div>
          </StyledRow>
          <StyledRow>
            <p>Already have an account. </p>
            <a href="/register">Sign in</a>
          </StyledRow>
          <Button type="submit">Submit</Button>
        </Container>
      </form>
    </StyledApp>
  );
};

export default Register;
