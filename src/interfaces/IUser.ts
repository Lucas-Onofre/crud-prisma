export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  refreshToken: string | null;
  confirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
