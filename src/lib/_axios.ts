import axios from "axios";
import { getCookie } from "cookies-next";
import queryString from "query-string";

import { COOKIES } from "./constants";

export const _axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000/api/v1",
  paramsSerializer,
});

_axios.interceptors.request.use((config) => {
  const token = getCookie(COOKIES.auth);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

function paramsSerializer(params: Record<string, unknown>) {
  return queryString.stringify(params);
}
