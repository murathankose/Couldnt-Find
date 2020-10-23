import React from 'react';
import { Button } from 'react-bootstrap';

export const PopupButton = ({ children, ...props }) => {
  return (
    <Button className="m-md-2" {...props}>
      {children}
    </Button>
  );
};
