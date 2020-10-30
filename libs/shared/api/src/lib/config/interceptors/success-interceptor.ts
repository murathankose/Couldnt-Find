import { AxiosResponse } from 'axios';
const success = {
  'auth/signin': {
    '200': 'Giriş işleminiz başarı ile gerçekleşti. Ana sayfaya yönlendiriliyorsunuz.\n',
  },
  'auth/sign-up': {
    '201': 'Kayıt işleminiz başarı ile gerçekleşti. Mailinize aktivasyon kodu gönderildi. Lütfen hesabınızı aktive ediniz.',
  },
  'user/change-password': {
    '200': 'Password is successfully changed',
  },
  'auth/forgot-password':{
    '200':'Password reset link has been sent to the e-mail address.',
  },
  'user/create-new-password':{
    '200':'The password was changed'
  }
};
export const successInterceptor = (res: AxiosResponse) => {
  if (res?.config.url.endsWith('/signin') || res?.config.url.endsWith('/sign-up')
    || res?.config.url.endsWith('/change-password')|| res?.config.url.endsWith('/create-new-password')
    || res?.config.url.endsWith('/forgot-password')) {
    const successMessage = success[res.config.url][res?.status];
    window['UGLY_STORE'].dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: successMessage });
  }

  return res;
};
