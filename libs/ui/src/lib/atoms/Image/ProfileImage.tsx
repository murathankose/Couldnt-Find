import React from 'react';

type ProfileImageProps = {
  image: string;
} & JSX.IntrinsicElements['img'];

export const ProfileImage: React.FC<ProfileImageProps> = ({ image, ...rest }) => {
  return <img className="rounded-circle shadow" alt={`Profile`} src={image} {...rest} />;
};
