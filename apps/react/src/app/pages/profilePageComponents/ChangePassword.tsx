import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import { Button, Input } from '@internship/ui';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changePasswordAsync } from '@internship/store/authentication';
import { useTemporary } from '@internship/shared/hooks';

export const ChangePassword = () => {
  const { handleSubmit, register, errors, getValues } = useForm();
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
            <Input type="password" name="oldPassword" placeholder="Old Password" ref={register({ required: true })} errors={errors} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newPassword">
          <Form.Label column sm={2}>
            New Password
          </Form.Label>
          <Col sm={4}>
            <Input
              className={passworderror && 'is-invalid'}
              type="password"
              name="newPassword"
              placeholder="New Password"
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
            <div className="invalid-feedback">{passworderror}</div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newPasswordConfirmation">
          <Form.Label column sm={2}>
            Confirm Password
          </Form.Label>
          <Col sm={4}>
            <Input
              className={passworderror && 'is-invalid'}
              type="password"
              name="newPasswordConfirmation"
              placeholder="Confirm Password"
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
