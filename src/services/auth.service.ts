import axiosClient from "./axios-client";

const endpoints = {
  login: "/auth/login",
  register: "/auth/register",
};

export async function signIn(data: { email: string; password: string }) {
  return axiosClient.post(endpoints.login, data);
}

export async function signUp(data: {
  email: string;
  password: string;
  fullName: string;
}) {
  return axiosClient.post(endpoints.register, data);
}
