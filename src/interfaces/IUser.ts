export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  confirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
