import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import { Button } from '@internship/ui';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changePasswordAsync } from '@internship/store/authentication';
import { useTemporary } from '@internship/shared/hooks';
import _ from 'lodash/fp';
import styled from 'styled-components';

const StyledP = styled.p`
  color: #bf1650;
`;
export const ChangePassword = () => {
  const { handleSubmit, register, errors, getValues } = useForm<Inputs>();
  const dispatch = useDispatch();
  const [passworderror, setPasswordError] = useState('');
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const [enable, setEnable] = useState(false);

  const onSubmit = (values) => {
    dispatch(changePasswordAsync.request(values));
  };

  const onChange = () => {
    const secondPassword = getValues()['newPassword'];
    const confirmationPassword = getValues()['newPasswordConfirmation'];
    if (secondPassword !== confirmationPassword) {
      setPasswordError('Şifre Eşleşmedi');
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      setEnable(true);
    } else {
      setPasswordError('');
      setEnable(false);
    }
  };

  type Inputs = {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
  };

  return (
    <Container>
      <Row>
        <h3>Change Password</h3>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId="oldPassword">
          <Form.Label column sm={2}>
            Old Password
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              className={errors.oldPassword ? 'form-control is-invalid' : 'form-control'}
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              ref={register({ required: true })}
            />
            {_.get('oldPassword.type', errors) === 'required' && <StyledP>This field is required</StyledP>}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newPassword">
          <Form.Label column sm={2}>
            New Password
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              className={passworderror || errors.newPassword ? 'form-control is-invalid' : 'form-control'}
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={onChange}
              ref={register({ required: true, maxLength: 20, minLength: 6, pattern: /^[A-Za-z0-9]+$/,
                validate: (input) => new RegExp(/[a-z]/).test(input) && new RegExp(/[A-Z]/).test(input) && new RegExp(/[0-9]/).test(input),
              })}
            />
            {_.get('newPassword.type', errors) === 'required' && <StyledP>This field is required</StyledP>}
            {_.get('newPassword.type', errors) === 'maxLength' && <StyledP>Password cannot exceed 20 characters</StyledP>}
            {_.get('newPassword.type', errors) === 'minLength' && <StyledP>Password cannot be less than 6 characters</StyledP>}
            {_.get('newPassword.type', errors) === 'pattern' && (
              <StyledP>Your password can contain the characters A-Z, a-z, and 0-9.</StyledP>
            )}
            {_.get('newPassword.type', errors) === 'validate' && (
              <StyledP>Your password must contain numbers, uppercase and lowercase letters.</StyledP>
            )}
            <div className="invalid-feedback">{passworderror}</div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newPasswordConfirmation">
          <Form.Label column sm={2}>
            Confirm Password
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              className={passworderror || errors.newPasswordConfirmation ? 'form-control is-invalid' : 'form-control'}
              type="password"
              name="newPasswordConfirmation"
              placeholder="Confirm Password"
              onChange={onChange}
              ref={register({ required: true, maxLength: 20, minLength: 6, pattern: /^[A-Za-z0-9]+$/,
                validate: (input) => new RegExp(/[a-z]/).test(input) && new RegExp(/[A-Z]/).test(input) && new RegExp(/[0-9]/).test(input),
              })}
            />
            {_.get('newPasswordConfirmation.type', errors) === 'required' && <StyledP>This field is required</StyledP>}
            {_.get('newPasswordConfirmation.type', errors) === 'maxLength' && <StyledP>Password cannot exceed 20 characters</StyledP>}
            {_.get('newPasswordConfirmation.type', errors) === 'minLength' && <StyledP>Password cannot be less than 6 characters</StyledP>}
            {_.get('newPasswordConfirmation.type', errors) === 'pattern' && (
              <StyledP>Your password can contain the characters A-Z, a-z, and 0-9.</StyledP>
            )}
            {_.get('newPasswordConfirmation.type', errors) === 'validate' && (
              <StyledP>Your password must contain numbers, uppercase and lowercase letters.</StyledP>
            )}
            <div className="invalid-feedback">{passworderror}</div>
          </Col>
        </Form.Group>
        {isErrorRequired ? <Alert variant="danger">{isErrorRequired}</Alert> : null}
        {isSuccessRequired ? <Alert variant="success">{isSuccessRequired}</Alert> : null}
        <Row className="justify-content-center">
          <Button type="submit" disabled={enable}>
            Update
          </Button>
        </Row>
      </Form>
    </Container>
  );
};
export default ChangePassword;
