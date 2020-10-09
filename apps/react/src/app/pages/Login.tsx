import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync,captchaAction } from '@internship/store/authentication';
import ReCAPTCHA from 'react-google-recaptcha';

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
export const Login = () => {
  const { handleSubmit, register } = useForm();
  const [isNeededCaptcha, setIsNeededCaptcha] = useState(false);
  const dispatch = useDispatch();

  const {captcha}=useSelector((store)=>({captcha:store.captcha.captcha}))
console.log("asd"+captcha);

 /* useEffect(() => {
    dispatch(captchaAction());
  },[onSubmit()])*/
  const onSubmit = (values) => {
    dispatch(loginAsync.request(values));
    dispatch(captchaAction());
  };
  function onChange(value) {
    console.log('Captcha value:', value);
  }

  return (
    <StyledApp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H4>Enter your information to log into your account.</H4>
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
              <label>Password:</label>
            </div>
            <div className="col-8">
              <input type="password" name="password" ref={register({ required: true })} />
            </div>
          </StyledRow>
          {captcha ? (
            <StyledRow>
              <div className="col-8">
                <ReCAPTCHA sitekey="6LcQ1tIZAAAAAGNUDStvqDuRoUT4JosqNHUXQg_y" name="captcha" onChange={onChange} />
              </div>
            </StyledRow>
          ) : null}
          <Button type="submit">Submit</Button>
        </Container>
      </form>
    </StyledApp>
  );
};

export default Login;
