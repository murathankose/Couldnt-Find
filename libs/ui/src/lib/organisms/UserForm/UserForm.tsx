import { Card, Col, Collapse, Container, Form, Row } from 'react-bootstrap';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateAsync } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { Button } from '../../atoms/Button';

type UserFormProps = {
  setEditUserInfo;
  setInEditMode;
};

export const UserForm: React.FC<UserFormProps> = ({ setEditUserInfo, setInEditMode }) => {
  const { handleSubmit, register } = useForm();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(updateAsync.request(values));
    setEditUserInfo(true);
    setInEditMode(false);
  };
  const onChange = () => {
    setOpen(true);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} controlId="username">
        <Form.Label column sm={2}>
          Username
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="username" placeholder="Username" readOnly />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="email">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="email" type="email" placeholder="Email" onChange={onChange} ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="name">
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="name" placeholder="Name"  onChange={onChange} ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="lastname">
        <Form.Label column sm={2}>
          Last Name
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="lastname" placeholder="Last Name" onChange={onChange} ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="age">
        <Form.Label column sm={2}>
          Age
        </Form.Label>
        <Col sm={4}>
          <Form.Control name="age" placeholder="Age" onChange={onChange} ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="phoneNumber">
        <Form.Label column sm={2}>
          Phone Number
        </Form.Label>
        <Col sm={4}>
          <Form.Control name="phoneNumber" placeholder="Phone Number" onChange={onChange} ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="bio">
        <Form.Label column sm={2}>
          Bio
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="bio" onChange={onChange} as="textarea" rows={5} ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Row className="justify-content-end">
        <Button type="submit" disabled={!open}>Update</Button>
      </Row>
    </Form>
  );
};
