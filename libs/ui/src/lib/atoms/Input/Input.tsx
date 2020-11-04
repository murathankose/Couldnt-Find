import React from 'react';
import { ErrorMessage } from '../ErrorMessage';

type InputProps = {
  errors?: Record<string, any>;
} & JSX.IntrinsicElements['input'];

export const Input: React.FC<InputProps> = React.forwardRef((props, ref) => {
  const { errors, name } = props;

  return (
    <>
      <input ref={ref} {...props} />
      {errors && <ErrorMessage errors={errors} name={name} />}
    </>
  );
});
