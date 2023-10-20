export interface UserLoginProps {
  user: {
    id: number;
    username: string;
    email: string;
  };
  jwt: string;
}
export interface UserProps {
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
  avatarId: number;
  createdAt: string;
  jwt: string;
}
export interface UserReview {
  id?: number;
  username?: string;
  count?: number | undefined;
  email?: string;
  text?: string;
  createdAt?: string;
  stars?: number | undefined;
}
