import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { api, LikeContentResponse } from '@internship/shared/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { likeAsync } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { Button } from '../../atoms/Button';

const StyledRow = styled(Row)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const StyledRowContent = styled(StyledRow)`
  display: block;
`;

const StyledContainer = styled(Container)`
  margin-top: 1.5rem;
  @media (min-width: 768px) {
    padding-right: 3.2rem;
  }
`;
const StyledStrong = styled.strong`
  margin-right: 1rem;
`;

const StyledContent = styled(StyledStrong)`
  color: red;
`;
const StyledCancelLikeButton = styled(Button)`
  background-color: red;
  font-size: 0.7rem;
  margin-right: 3.2rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

type MyContentsProps = {
  username;
  likeOrDislike;
  isGuest;
};

export const MyLikes: React.FC<MyContentsProps> = ({ username, likeOrDislike, isGuest }) => {
  const [myLike, setMyLike] = useState<LikeContentResponse[]>();
  const [myDislike, setMyDislike] = useState<LikeContentResponse[]>();
  const dispatch = useDispatch();
  const [updateContent, setUpdateContent] = useState(false);

  const addLike = (contentID, likes) => {
    const values = { contentID: contentID, like: likes };
    dispatch(likeAsync.request(values));
    setUpdateContent(true);
  };

  useEffect(() => {
    api.auth
      .getLikes('like', username)
      .then((r) => {
        setMyLike(r);
      })
      .catch((e) => console.error(e));
    setUpdateContent(false);
  }, [updateContent]);

  useEffect(() => {
    api.auth
      .getLikes('dislike', username)
      .then((r) => {
        setMyDislike(r);
      })
      .catch((e) => console.error(e));
    setUpdateContent(false);
  }, [updateContent]);
  return (
    <StyledContainer>
      <StyledRow>
        {(likeOrDislike ? myLike : myDislike)?.map((d, key) => (
          <li key={key} className="ml-4">
            <StyledRowContent>
              <StyledStrong>
                Konu Adı : <Link to={'/contents/' + d.topic.topicName}>{d.topic.topicName}</Link>
              </StyledStrong>
              <br />
              <StyledContent>{d.content} </StyledContent>
              <br />
              {!isGuest ? (
                <>
                  {likeOrDislike ? (
                    <StyledCancelLikeButton onClick={() => addLike(d.id, 'cancel-like')}>
                      <FontAwesomeIcon icon={faThumbsDown} />
                    </StyledCancelLikeButton>
                  ) : (
                    <StyledCancelLikeButton onClick={() => addLike(d.id, 'cancel-dislike')}>
                      <FontAwesomeIcon icon={faThumbsUp} />
                    </StyledCancelLikeButton>
                  )}
                </>
              ) : null
              }
              <br />
              <StyledStrong>
                Kullanıcı : <Link to={'/user/' + d.user.username}>{d.user.username}</Link>
              </StyledStrong>
              <br />
              <StyledStrong>Tarih : {d.createDate.substring(0, 10)}</StyledStrong>
              <StyledStrong>Saat : {d.createDate.substring(11, 16)}</StyledStrong>
            </StyledRowContent>
          </li>
        ))}
      </StyledRow>
    </StyledContainer>
  );
};
