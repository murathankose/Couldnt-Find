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

  @media (min-width: 768px) {
    padding-right: 3.2rem;
  }
`;
const StyledStrong = styled.strong`
  margin-right: 1rem;
`;

const StyledContent = styled(StyledStrong)`
  color: blueviolet;
  font-weight: 500;
`;

const StyledCancelLikeButton = styled(Button)`
  background-color: red;
  font-size: 0.7rem;
  margin-right: 3.2rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

const StyledLink = styled(Link)`
  color: blueviolet;
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
          <li style={{ listStyleType: 'none' }} key={key} className="ml-4">
            <StyledRowContent>
              <StyledStrong>
                Konu Adı : <StyledLink to={'/contents/' + d.topic.topicName}>{d.topic.topicName}</StyledLink>
              </StyledStrong>
              <br />
              <StyledContent>{d.content} </StyledContent>
              {!isGuest ? (
                <>
                  <br />
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
              ) : null}
              <br />
              <StyledStrong>
                Kullanıcı : <StyledLink to={'/user/' + d.user.username}>{d.user.username}</StyledLink>
              </StyledStrong>
              <br />
              <StyledStrong>
                Tarih : <StyledContent>{d.createDate.substring(0, 10)}</StyledContent>
              </StyledStrong>
              <StyledStrong>
                Saat :<StyledContent> {d.createDate.substring(11, 16)}</StyledContent>
              </StyledStrong>
            </StyledRowContent>
          </li>
        ))}
      </StyledRow>
    </StyledContainer>
  );
};
