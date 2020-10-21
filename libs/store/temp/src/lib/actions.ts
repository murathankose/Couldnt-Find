import { createAction } from "typesafe-actions";

export const captchaRequired = createAction('@temp/CAPTCHA_REQUIRED')<boolean>();
