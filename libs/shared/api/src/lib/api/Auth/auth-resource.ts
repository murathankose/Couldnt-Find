import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  ContentResponse,
  LikeContentResponse,
  SessionDetailResponse,
  TopicResponse,
  UserDetailResponse,
  UserInfoResponse
} from './types';
import {
  ChangePasswordRequest,
  ContentRequest,
  ForgotPasswordRequest,
  LikeRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  ResetPasswordRequest,
  TopicRequest
} from '@internship/shared/types';

export class AuthResource {
  constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {}

  // TODO change any types according to request/response model
  login = (data: LoginRequest): Promise<any> => this.axios.post('auth/signin', data, this.axiosRequestConfig).then((r) => r.data);
  register = (data: RegisterRequest): Promise<any> => this.axios.post('auth/sign-up', data, this.axiosRequestConfig).then((r) => r.data);
  update = (data: any): Promise<any> => this.axios.put('user/edit', data, this.axiosRequestConfig).then((r) => r.data);
  newPassword = (data: ForgotPasswordRequest): Promise<any> =>
    this.axios.post('auth/forgot-password', data, this.axiosRequestConfig).then((r) => r.data);
  logout = (data: LogoutRequest): Promise<any> => this.axios.post('user/logout', data, this.axiosRequestConfig).then((r) => r.data);
  resetPassword = (data: ResetPasswordRequest): Promise<any> =>
    this.axios.post('user/create-new-password', data, this.axiosRequestConfig).then((r) => r.data);
  userDetail = (): Promise<UserDetailResponse> => this.axios.get('user/', this.axiosRequestConfig).then((r) => r.data);
  changePassword = (data: ChangePasswordRequest): Promise<any> =>
    this.axios.post('user/change-password', data, this.axiosRequestConfig).then((r) => r.data);
  sessionDetail = (): Promise<SessionDetailResponse[]> => this.axios.get('/user/active-sessions', this.axiosRequestConfig).then((r) => r.data);
  deleteSession = (authorizationToken: string, refreshToken: string, accessToken: string): Promise<any> =>
    this.axios
      .delete('/user/logout-from-session', {
        headers: {
          Authorization: authorizationToken
        },
        params: {
          token: refreshToken,
          accessToken: accessToken
        }
      })
      .then((r) => r.data);
  sendActivation = (data: string): Promise<string> => this.axios.get('auth/send-email?email=' + data, this.axiosRequestConfig);

  addTopic = (data: TopicRequest): Promise<any> => this.axios.post('entry/addTopic', data, this.axiosRequestConfig).then((r) => r.data);
  getTopic = (): Promise<TopicResponse[]> => this.axios.get('entry/getTopics', this.axiosRequestConfig).then((r) => r.data);
  addContent = (data: ContentRequest): Promise<any> => this.axios.post('entry/addContent', data, this.axiosRequestConfig).then((r) => r.data);
  getContent = (topicName: string): Promise<ContentResponse[]> =>
    this.axios
      .get('entry/getContent', {
        params: {
          topic: topicName
        }
      })
      .then((r) => r.data);

  userInfo = (userName: string): Promise<UserInfoResponse> =>
    this.axios
      .get('user/info', {
        params: {
          userName: userName
        }
      })
      .then((r) => r.data);

  myContents = (): Promise<ContentResponse[]> => this.axios.get('entry/getMyContents', this.axiosRequestConfig).then((r) => r.data);
  userContents = (userName: string): Promise<ContentResponse[]> =>
    this.axios
      .get('entry/getUserContents', {
        params: {
          userName: userName
        }
      })
      .then((r) => r.data);

  addLike = (data: LikeRequest): Promise<any> =>
    this.axios
      .put('entry/like-dislike', data, this.axiosRequestConfig)
      .then((r) => r.data);

  getLikes = (like: string, username: string): Promise<LikeContentResponse[]> =>
    this.axios
      .get('entry/getLikes', {
        params: {
          like: like,
          userName: username
        }
      })
      .then((r) => r.data);
}
