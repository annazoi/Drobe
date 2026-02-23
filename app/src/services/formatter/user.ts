import { User } from "../../interfaces/user";

export const formatUser = (data: any): User => {
  return {
    id: data._id,
    username: data.username,
    email: data.email,
    age: data.age,
    avatar: data.avatar,
  };
};
