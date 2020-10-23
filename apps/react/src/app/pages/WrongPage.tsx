import React from 'react';
import { Button } from '@internship/ui';
import { useHistory } from 'react-router-dom';

export const WrongPage = () => {
  const history = useHistory();
  const goToTheMainPage = () => {
    history.push('/');
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
      <div>
        <h2>Ulaşmaya Çalıştığınız Sayfa Geçici Olarak Kullanılamıyor</h2>
        <p>Ana Sayfaya Dönmek için Tıklayınız.</p>
        <Button onClick={goToTheMainPage}>Ana Sayfaya Dön</Button>
      </div>
    </div>
  );
};
