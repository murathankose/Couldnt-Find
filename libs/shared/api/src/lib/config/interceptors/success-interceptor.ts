import { AxiosResponse } from 'axios';
const success = {
  'auth/signin': {
    '200': 'Giriş işleminiz başarı ile gerçekleşti. Ana sayfaya yönlendiriliyorsunuz.\n',
  },
  'auth/sign-up': {
    '201': 'Kayıt işleminiz başarı ile gerçekleşti. Mailinize aktivasyon kodu gönderildi. Lütfen hesabınızı aktive ediniz.',
  },
};
export const successInterceptor = (res: AxiosResponse) => {
  if (res.config.url.endsWith('/signin') || res.config.url.endsWith('/sign-up')) {
    const successMessage = success[res.config.url][res?.status];
    window['UGLY_STORE'].dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: successMessage });
  }

  return res;
};
