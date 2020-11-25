import React, { useEffect, useState } from 'react';
import { Alert, Modal, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Button, Input } from '../../atoms';
import { useForm } from 'react-hook-form';
import { topicAsync } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { useTemporary } from '@internship/shared/hooks';


const StyledRow = styled(Row)`
  margin-bottom: 1rem;
  margin-top: 2rem;
  margin-right: auto;
  margin-left: auto;
`;

type TopicFormProps = {
  setClose;
};
export const TopicForm: React.FC<TopicFormProps> = ({ setClose }) => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const { isErrorRequired, isSuccessRequired } = useTemporary();

  const onBlur = () => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
  };
  const onSubmit = (values) => {
    dispatch(topicAsync.request(values));
  };

  useEffect(() => {
    if (isSuccessRequired) {
      setClose(false);
    }
  }, [isSuccessRequired]);

  const handleClose = () => {
    setShow(false);
    setClose(false);
  };

  return (
    <Modal show={show} onHide={() => handleClose()} keyboard={false}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>New Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledRow>
            <div className="col-4 mt-2 ml-n2">
              <label>Konu ismi</label>
            </div>
            <div className="col-8 ml-sm-2">
              <Input placeholder="Konu ismi" name="topicName" onBlur={onBlur} ref={register({ required: true })}
                     errors={errors} />
            </div>
          </StyledRow>
          <StyledRow>
            {isErrorRequired ? (
              <Alert variant="danger">{isErrorRequired}</Alert>
            ) : null}
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
