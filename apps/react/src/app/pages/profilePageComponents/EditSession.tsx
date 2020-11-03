import { Container, Row } from 'react-bootstrap';
import { Button, Popup, PopupButton } from '@internship/ui';
import React, { useEffect, useState } from 'react';
import { api, SessionDetailResponse } from '@internship/shared/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAccessToken, getRefreshToken } from '@internship/shared/utils';

export const EditSession = () => {
  const [detail, setDetail] = useState<SessionDetailResponse[]>();
  const [sessionInfo, setSessionInfo] = useState(false);
  const [sameAccount, setSameAccount] = useState(false);

  useEffect(() => {
    api.auth
      .sessionDetail()
      .then((r) => {
        setDetail(r);
      })
      .catch((e) => console.error(e));
  }, [sessionInfo]);

  const deleteSession = (token) => {
    if (token !== getRefreshToken()) {
      const accessToken = getAccessToken();
      api.auth.deleteSession(`Bearer ${accessToken}`, token).then(() => {
        setSessionInfo(!sessionInfo);
      }).catch((e) => console.error(e));

    } else {
      setSameAccount(true);
    }
  };
  const refreshInfo = () => {
    setSessionInfo(!sessionInfo);
    setSameAccount(false);
  };

  return (
    <Container>
      <h5>
        <div>
          <h4>
            <b className="text-black-50">Session Info</b>
          </h4>
          <Row>
            {detail?.map((d, key) => (
              <li key={key} className="ml-4">
                <Row>
                  Giriş Yapılan Arayüz: {d.userAgent}
                  <br />
                  expireDate: {d.expireDate}
                  <br />
                  issueDate: {d.issueDate}
                </Row>
                <Button className="btn btn-danger my-2" onClick={() => deleteSession(d.refreshToken)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </li>
            ))}
          </Row>
          {sameAccount ? (
            <Popup show={sameAccount} onHide={refreshInfo}>
              Zaten hazırda giriş yaptığınız hesabı kaldıramazsınız.
              <br />
              <PopupButton variant="primary" onClick={refreshInfo}>
                Submit
              </PopupButton>
            </Popup>
          ) : null}
        </div>
      </h5>
    </Container>
  );
};
export default EditSession;
