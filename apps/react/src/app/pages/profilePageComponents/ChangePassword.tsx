import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import { Button, Popup, PopupButton } from '@internship/ui';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changePasswordAsync } from '@internship/store/authentication';
import { useTemporary } from '@internship/shared/hooks';

export const ChangePassword = () => {
  const { handleSubmit, register, errors,getValues } = useForm<Inputs>();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [passworderror, setPasswordError] = useState('');
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const [enable, setEnable] = useState(false);

  const onSubmit = (values) => {
    dispatch(changePasswordAsync.request(values));
  };

  const onChange = () => {
    const firstPassword = getValues()['oldPassword'];
    const secondPassword = getValues()['newPassword'];
    const confirmationPassword = getValues()['newPasswordConfirmation'];
    if (secondPassword !== confirmationPassword) {
      setPasswordError('Şifre Eşleşmedi');
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      setEnable(false);
    }
    else if (secondPassword.length < 6 || secondPassword.length>20) {
      setPasswordError('Şifre en az 6 en fazla 20 karakter olmalı');
      setEnable(false);
    }
    else if(secondPassword.search(/[A-Z]/)<0){
      setPasswordError('Şifre en az 1 tane büyük harf içermeli');
      setEnable(false);
    }
    else if(secondPassword.search(/[a-z]/)<0){
      setPasswordError('Şifre en az 1 tane küçük harf içermeli');
      setEnable(false);
    }
    else if(secondPassword.search(/[0-9]/)<0){
      setPasswordError('Şifre en az 1 rakam içermeli');
      setEnable(false);
    }
    else {
      setPasswordError('');
      setEnable(true);
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
            <Form.Control className={errors.oldPassword ? 'form-control is-invalid' : 'form-control'} type="password" name="oldPassword" placeholder="Old Password" onChange={onChange} ref={register({ required: true })} />
            {errors.oldPassword && (
              <div className="invalid-feedback">Enter your old password</div>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newPassword">
          <Form.Label column sm={2}>
            New Password
          </Form.Label>
          <Col sm={4}>
            <Form.Control className={passworderror || errors.newPassword ? 'form-control is-invalid' : 'form-control'} type="password" name="newPassword" placeholder="New Password" onChange={onChange} ref={register({ required: true })} />
            <div className="invalid-feedback">{passworderror}</div>
            {errors.newPassword && (
              <div className="invalid-feedback">Enter your new password</div>
            )}
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
              ref={register({ required: true })}
            />
            <div className="invalid-feedback">{passworderror}</div>
            {errors.newPasswordConfirmation && (
              <div className="invalid-feedback">Enter your new again</div>
            )}
          </Col>
        </Form.Group>
        {isErrorRequired ? <Alert variant="danger">{isErrorRequired}</Alert> : null}
        {isSuccessRequired ? <Alert variant="success">{isSuccessRequired}</Alert> : null}
        <Row className="justify-content-center">
          <Button type="submit" disabled={!enable}>Update</Button>
        </Row>
      </Form>
    </Container>
  );
};
export default ChangePassword;
