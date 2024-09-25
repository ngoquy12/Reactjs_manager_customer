import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/instance";
import { POST } from "../constants/httpMethod";
import Cookies from "js-cookie";

export const register = (user) => {
  const response = BASE_URL[POST]("auth/register", user);

  return response;
};

export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    const response = await BASE_URL[POST]("auth/login", user);

    Cookies.set("token", JSON.stringify(response.data), {
      expires: 1 / 24 / 60,
    });

    return response.data;
  } catch (error) {
    return error;
  }
});

export const loadUserFromCookie = createAsyncThunk(
  "auth/loadUserFromCookie",
  async (userData) => {
    return userData;
  }
);
