import axiosClient from "./axios-client";

const endpoints = {
    signIn: "/sign-in",
    signUp: "/sign-up"
}

export async function signIn(data: { email: string; password: string }) {
    return axiosClient.post(endpoints.signIn, data);
}

export async function signUp(data: { email: string; password: string; fullName: string }) {
    return axiosClient.post(endpoints.signUp, data);
}