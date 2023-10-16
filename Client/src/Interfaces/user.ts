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
  createdAt: string;
  jwt: string;
}
