import { AxiosResponse } from 'axios';

const success = {
  'auth/signin': {
    '200': 'Giriş işleminiz başarı ile gerçekleşti. Ana sayfaya yönlendiriliyorsunuz.\n'
  },
  'auth/sign-up': {
    '201': 'Kayıt işleminiz başarı ile gerçekleşti. Mailinize aktivasyon kodu gönderildi. Lütfen hesabınızı aktive ediniz.'
  },
  'user/change-password': {
    '200': 'Password is successfully changed'
  },
  'auth/forgot-password': {
    '200': 'Password reset link has been sent to the e-mail address.'
  },
  'user/create-new-password': {
    '200': 'The password was changed'
  },
  'user/edit': {
    '200': 'User update success.'
  },
  'auth/send-email': {
    '200': 'Aktivasyon kodunuz gönderildi.'
  },
  'entry/like-dislike': {
    '200': 'İşleminiz Başarılı.'
  },
  'entry/addTopic': {
    '200': 'İşleminiz Başarılı.'
  },
  'entry/addContent': {
    '200': 'İşleminiz Başarılı.'
  }
};
export const successInterceptor = (res: AxiosResponse) => {
  let successMessage = null;
  if (
    res?.config.url.endsWith('/signin') ||
    res?.config.url.endsWith('/sign-up') ||
    res?.config.url.endsWith('/change-password') ||
    res?.config.url.endsWith('/create-new-password') ||
    res?.config.url.endsWith('/forgot-password') ||
    res?.config.url.endsWith('/edit') ||
    res?.config.url.endsWith('/like-dislike') ||
    res?.config.url.endsWith('/addTopic') ||
    res?.config.url.endsWith('/addContent')
  ) {
    successMessage = success[res.config.url][res?.status];
  } else if (res?.config.url.startsWith('auth/send-email') && res?.status === 200) {
    successMessage = success['auth/send-email']['200'];
  }
  window['UGLY_STORE'].dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: successMessage });
  return res;
};
