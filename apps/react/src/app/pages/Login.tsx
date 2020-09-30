import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';

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
  const [formValues, setFormValues] = useState({});

  const updateState = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };


  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/auth/signin/', formValues).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("cloud_users", JSON.stringify(response.data));
      }
      return response.data;
    });
  };

  return (
    <StyledApp>
      <form onSubmit={(e) => onSubmit(e)}>
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
                value={formValues['username']}
                onChange={(e) => updateState(e)}
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
                value={formValues['password']}
                onChange={(e) => updateState(e)}
              />
            </div>
          </Row>
          <Button type="submit" onClick={(event) => onSubmit(event)}>
            Submit
          </Button>
        </Container>
      </form>
    </StyledApp>
  );
};

export default Login;
