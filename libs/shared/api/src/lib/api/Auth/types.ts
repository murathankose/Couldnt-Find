export interface UserDetailResponse {
  username: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: string;
  image: string;
}
export interface UserInfoResponse {
  username: string;
  name: string;
  lastName: string;
  age: string;
  image: string;
}

export interface TopicResponse {
  topicName: string;
  contentNumber: string;
  createDate: string;
  user: any;
  cloud_content: any;
}

export interface ContentResponse {
  id: string;
  content: string;
  like: string;
  dislike: string;
  createDate: string;
  topic: any;
  userLike: any;
  userDislike: any;
  user: any;
}

export interface LikeContentResponse {
  id: string;
  content: string;
  createDate: string;
  topic: any;
  user: any;
}

export interface SessionDetailResponse {
  refreshToken: string;
  accessToken: string;
  userAgent: string;
  expireDate: string;
  issueDate: string;
}
