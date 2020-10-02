import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
`;
const Row = styled.div`
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
export const Login = () => {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (values) => {
    axios
      .post('http://localhost:8080/api/auth/signin/', values)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('cloud_users', JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch(() => {
        // resetting by keeping username
        const { username } = values;
        reset({ username });
      });
  };

  return (
    <StyledApp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H4>Enter your information to log into your account.</H4>
        <Container>
          <Row className="row">
            <div className="col-4">
              <label>User Name:</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                name="username"
                ref={register({ required: true })}
              />
            </div>
          </Row>
          <Row className="row">
            <div className="col-4">
              <label>Password:</label>
            </div>
            <div className="col-8">
              <input
                type="password"
                name="password"
                ref={register({ required: true })}
              />
            </div>
          </Row>
          <Button type="submit">Submit</Button>
        </Container>
      </form>
    </StyledApp>
  );
};

export default Login;
