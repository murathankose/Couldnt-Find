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

export interface Pageable {
  first: boolean;
  last: boolean;
  content: any;
}

export interface SessionDetailResponse {
  refreshToken: string;
  accessToken: string;
  userAgent: string;
  expireDate: string;
  issueDate: string;
}
