import axios from "axios";
import { API_URL } from "../constants/api";
import { SignUp, SignIn } from "../interfaces/user";
import { decodeToken } from "../utils/token";

export const signUp = async (payload: SignUp) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { exp } = decodeToken(response.data.token);
    const data = {
      ...response.data,
      exp,
    };
    return data;
    // return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const signIn = async (payload: SignIn) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, payload);
    const { exp } = decodeToken(response.data.token);
    const data = {
      ...response.data,
      exp,
    };
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
