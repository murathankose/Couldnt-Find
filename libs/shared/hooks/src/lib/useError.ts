import { useSelector } from 'react-redux';

export function useError() {
  const isErrorRequired = useSelector((store) => store.temp?.errorRequired);
  return {
    isErrorRequired,
  };
}
