import React, { useState } from 'react';
import { Modal, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Button, Input } from '../../atoms';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { contentAsync } from '@internship/store/authentication';

const StyledRow = styled(Row)`
  margin-bottom: 1rem;
  margin-top: 2rem;
  margin-right: auto;
  margin-left: auto;
`;

type ContentFormProps = {
  setClose;
  topicName;
};
export const ContentForm: React.FC<ContentFormProps> = ({ setClose, topicName }) => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);


  //TODO konu ismi daha önce varsa uyarı ver ekle.
  const onBlur = () => {
    console.log('konu ismini araştır');
  };
  const onSubmit = (values) => {
    values={...values,topicName};
    dispatch(contentAsync.request(values));
    setClose(false);
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
    setClose(false);
  };

  return (
    <Modal show={show} onHide={() => handleClose()} keyboard={false}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{topicName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledRow>
            <div className="col-4 mt-2 ml-n2">
              <label>içerik: </label>
            </div>
            <div className="col-8 ml-sm-2">
              <Input placeholder="İçeriği giriniz" name="content" onBlur={onBlur} ref={register({ required: true })} errors={errors} />
            </div>
          </StyledRow>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
