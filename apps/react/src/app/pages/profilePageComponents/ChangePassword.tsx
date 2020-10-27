import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import { Button } from '@internship/ui';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changePasswordAsync } from '@internship/store/authentication';
import { useTemporary } from '@internship/shared/hooks';

export const ChangePassword = () => {
  const { handleSubmit, register, errors } = useForm<Inputs>();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const { isErrorRequired } = useTemporary();

  const onSubmit = (values) => {
    dispatch(changePasswordAsync.request(values));
  };

  const onChange = (event) => {
    const { name } = event.target;
    if (name === 'newPassword' || name === 'password' || name === 'newPasswordConfirmation') {
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    }
    if (name === 'newPassword' || name === 'password' || name === 'newPasswordConfirmation') {
      dispatch({ type: '@temp/SUCCESS_ACTION', payload: null });
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
            <Form.Control type="password" name="oldPassword" placeholder="Old Password" onChange={onChange} ref={register({ required: true })} />
            {errors.oldPassword && (
              <span>
                <Alert variant="danger">Enter your old password</Alert>
              </span>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newPassword">
          <Form.Label column sm={2}>
            New Password
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="password" name="newPassword" placeholder="New Password" onChange={onChange} ref={register({ required: true })} />
            {errors.newPassword && (
              <span>
                <Alert variant="danger">Enter your new password</Alert>
              </span>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newPasswordConfirmation">
          <Form.Label column sm={2}>
            Confirm Password
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="password"
              name="newPasswordConfirmation"
              placeholder="Confirm Password"
              onChange={onChange}
              ref={register({ required: true })}
            />
            {errors.newPasswordConfirmation && (
              <span>
                <Alert variant="danger">Enter your new password again</Alert>
              </span>
            )}
          </Col>
        </Form.Group>
        {isErrorRequired ? <Alert variant="danger">{isErrorRequired}</Alert> : null}
        <Row className="justify-content-center">
          <Button type="submit">Update</Button>
        </Row>
      </Form>
    </Container>
  );
};
export default ChangePassword;
