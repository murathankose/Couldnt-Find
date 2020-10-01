import { useState } from 'react';

export function useForm(initial = {}) {
  const [formState, setFormState] = useState<object>(initial);

  const setByEvent = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const setValue = (name, value) => {
    setFormState({ ...formState, name: value });
  };

  const handleSubmit = (onSubmit: (values: object) => void) => (event: any) => {
    event.preventDefault();
    event.persist();
    onSubmit && onSubmit(formState);
  };

  return {
    getValues: () => formState,
    setByEvent,
    setValue,
    handleSubmit,
  };
}
