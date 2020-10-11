import React from 'react';
import { Button } from '@internship/ui';
import { removeAccessToken } from '@internship/shared/utils';

export const Logout = () => {
  //TODO Then refactor as popup
  const logout = () =>{
    localStorage.removeItem("cloud_users");
    removeAccessToken();
  }
  return (
    <div>
      <h2>Çıkış yapmak istediğiniz emin misiniz?</h2>
      <Button href="/" onClick={logout}>Çıkış Yap</Button>
      <Button href="/">Vazgeç</Button>
    </div>
  );
};

export default Logout;
