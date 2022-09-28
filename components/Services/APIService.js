import axios from "axios";
import authStorage from "./Storage";

export const GetPosts = async () => {
  try {
    const response = await axios.get(
      `https://dogspot-backend-b8vp.vercel.app/posts`,
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const Login = async (data) => {
  try {
    const response = await axios.post(
      `https://dogspot-backend-b8vp.vercel.app/login`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const Register = async (data) => {
  try {
    const response = await axios.post(
      `https://dogspot-backend-b8vp.vercel.app/register`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const CreatePost = async (data) => {
  let token = await authStorage.getToken();
  if (token) {
    axios.defaults.headers.common["authorization"] = "Bearer " + token;
    try {
      const response = await axios.post(
        `https://dogspot-backend-b8vp.vercel.app/posts`,
        data,
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error.response.data;
    }
  }
};
