import { Col, Container, Form, Row } from 'react-bootstrap';
import { Button, UserForm } from '@internship/ui';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changePasswordAsync, updateAsync } from '@internship/store/authentication';

export const ChangePassword = ({ ...props }) => {
  const { handleSubmit, register } = useForm();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(changePasswordAsync.request(values));
  };

  return (
    <Container>
      <Row>
        <h3>Change Password</h3>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} controlId="oldPassword">
          <Col sm={4}>
            <Form.Control type="password" name="oldPassword" placeholder="Old Password" ref={register({ required: true })} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newPassword">
          <Col sm={4}>
            <Form.Control type="password" name="newPassword" placeholder="New Password" ref={register({ required: true })} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newPasswordConfirmation">
          <Col sm={4}>
            <Form.Control type="password" name="newPasswordConfirmation"  placeholder="Confirm Password" ref={register({ required: true })} />
          </Col>
        </Form.Group>
        <Row className="justify-content-center">
          <Button type="submit">Update</Button>
        </Row>
      </Form>
    </Container>

  );
};
export default ChangePassword;
