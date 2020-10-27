import { useSelector } from 'react-redux';

export function useTemporary() {
  const isCaptchaRequired = useSelector((store) => store.temp?.captchaRequired);
  const isErrorRequired = useSelector((store) => store.temp?.errorRequired);
  return {
    isCaptchaRequired,
    isErrorRequired,
  };
}
