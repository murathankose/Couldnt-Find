import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const Captcha = (props) => {
  return <ReCAPTCHA
    sitekey="6LcQ1tIZAAAAAGNUDStvqDuRoUT4JosqNHUXQg_y"
    onChange={props.input.onChange}
  />;
};

