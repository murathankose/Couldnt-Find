import { useSelector } from 'react-redux';

export function useTemporary() {
  const isCaptchaRequired = useSelector((store) => store.temp?.captchaRequired);

  return {
    isCaptchaRequired,
  };
}
