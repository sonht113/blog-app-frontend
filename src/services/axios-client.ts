import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import { getSession, signOut } from "next-auth/react";

import { serverConfig } from "@config";
import { ROUTE } from "@constants/route";

type RequestConfig = AxiosRequestConfig & {
  disabledToken?: boolean;
};

class Requester {
  private requester: AxiosInstance;

  constructor() {
    this.requester = axios.create({
      baseURL: serverConfig.api_server_url,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        timezone: new Date().getTimezoneOffset()
      }
    });

    this.setupInterceptors();
  }

  /** ------------------------------
   *  Setup Axios interceptors
   *  ------------------------------ */
  private setupInterceptors() {
    this.requester.interceptors.request.use(this.onRequest, this.onRequestError);
    this.requester.interceptors.response.use(this.onSuccess, this.onError);
  }

  /** ------------------------------
   *  REQUEST INTERCEPTOR
   *  ------------------------------ */
  private async onRequest(
    config: InternalAxiosRequestConfig & { disabledToken?: boolean }
  ) {
    if (!config.disabledToken) {
      const session = await getSession();
      const token = session?.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    delete config.disabledToken;
    return config;
  }

  private onRequestError(error: AxiosError) {
    return Promise.reject(error);
  }

  /** ------------------------------
   *  RESPONSE INTERCEPTOR
   *  ------------------------------ */
  private onSuccess(response: AxiosResponse) {
    return response.data;
  }

  private onError = (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        signOut({
          callbackUrl: `${window.location.origin}${ROUTE.SIGN_IN}`
        });
        break;

      case 404:
        window.location.href = `${window.location.origin}${ROUTE.NOT_FOUND}`;
        break;
    }

    return Promise.reject(error);
  };

  /** ------------------------------
   *  SHORTCUT METHODS
   *  ------------------------------ */
  get<T = any>(url: string, params?: any, config?: RequestConfig) {
    return this.requester.get<T>(url, { params, ...config });
  }

  post<T = any>(url: string, data?: any, config?: RequestConfig) {
    return this.requester.post<T>(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: RequestConfig) {
    return this.requester.put<T>(url, data, config);
  }

  patch<T = any>(url: string, data?: any, config?: RequestConfig) {
    return this.requester.patch<T>(url, data, config);
  }

  delete<T = any>(url: string, config?: RequestConfig) {
    return this.requester.delete<T>(url, config);
  }
}

const axiosClient = new Requester();
export default axiosClient;
