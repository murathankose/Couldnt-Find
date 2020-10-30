import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from '../../atoms/Button';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Search = () => {
  return (
    <Form inline className="mr-sm-4">
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="light">
        <FontAwesomeIcon icon={faSearchengin} style={{ marginRight: '10px' }} />
      </Button>
    </Form>
  );
};
