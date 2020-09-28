
import styled from 'styled-components';
import React, {useState} from 'react';
import axios from 'axios';

const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;

`;
const Row = styled.div`
  margin-bottom:1rem;
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
  background-color: #008CBA;
`;
export const register = () => {
  const [formValues, setFormValues] = useState({});
  const updateState = e => {
    setFormValues({...formValues, [e.target.name]: e.target.value});
  }
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/user/",formValues);
  }
  return (
    <StyledApp>
        <form onSubmit = {e => onSubmit(e)}>
        <h2>Sign up</h2>
        <h4>Enter your information to create an account.</h4>
        {/*<Row>*/}
        {/*  <label>First Name:</label>*/}
        {/*  <input type="text" id="fname" name="fname"/><br/>*/}
        {/*</Row>*/}
        {/*<Row>*/}
        {/*  <label >Second Name:</label>*/}
        {/*  <input type="text" id="sname" name="sname"/>*/}
        {/*</Row>*/}
        <Row>
          <label >User Name:</label>
          <input type="text" name="username" value={formValues['username']} onChange={e => updateState(e)} />
        </Row>
        <Row>
          <label >E-mail:</label>
          <input type="email" name="email" value={formValues['email']} onChange={e => updateState(e)}/>
        </Row>
        <Row>
          <label >Password:</label>
          <input type="password" name="password" value={formValues['password']} onChange={e => updateState(e)}/>
        </Row>
        <Button type="submit">Submit</Button>
        </form>
      </StyledApp>
  );
};

export default register;
