interface IUser {
  _id?: string;
  email: string;
  password: string;
}

interface IUserResponse {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
