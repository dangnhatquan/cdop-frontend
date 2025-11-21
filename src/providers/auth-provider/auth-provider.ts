"use client";

import type { AuthBindings } from "@refinedev/core";
import Cookies from "js-cookie";

const mockUsers = [
  {
    phoneNumber: "0778812024",
    name: "Đặng Nhật Quân",
    email: "dnquan@veritastvn.com",
    avatar_url: "https://i.pravatar.cc/150?img=1",
    roles: ["user"],
    id: 1,

    created_at: "2025-11-06 02:20:51",
    updated_at: "2025-11-21 16:39:28",
    deleted_at: null,
  },
  {
    phoneNumber: "0975173018",
    name: "Vũ Nhất Khang",
    email: "vnkhang@veritastvn.com",
    avatar_url: "https://i.pravatar.cc/150?img=1",
    roles: ["user"],
    id: 4,

    created_at: "2025-11-06 02:20:51",
    updated_at: "2025-11-21 16:39:28",
    deleted_at: null,
  },
  {
    name: "Hoàng Kỳ Anh",
    phoneNumber: "0343557272",
    email: "hkanh@veritastvn.com",
    avatar_url: "https://i.pravatar.cc/150?img=1",
    roles: ["user"],
    id: 2,

    created_at: "2025-11-06 02:20:51",
    updated_at: "2025-11-21 16:39:28",
    deleted_at: null,
  },
  {
    name: "Bùi Thị Hoàng Giang",
    phoneNumber: "0971241268",
    email: "bthgiang@veritastvn.com",
    avatar_url: "https://i.pravatar.cc/150?img=1",
    roles: ["user"],
    id: 3,

    created_at: "2025-11-06 02:20:51",
    updated_at: "2025-11-21 16:39:28",
    deleted_at: null,
  },
];

export const authProvider: AuthBindings = {
  login: async ({ phoneNumber, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.phoneNumber === phoneNumber);

    if (user) {
      Cookies.set("auth", JSON.stringify(user), {
        expires: 30, // 30 days
        path: "/",
      });
      return {
        success: true,
        redirectTo: "/home",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  register: async (params) => {
    const user = mockUsers.find(
      (item) => item.phoneNumber === params.phoneNumber
    );

    if (user) {
      Cookies.set("auth", JSON.stringify(user), {
        expires: 30, // 30 days
        path: "/",
      });
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  forgotPassword: async (params) => {
    const user = mockUsers.find(
      (item) => item.phoneNumber === params.phoneNumber
    );

    if (user) {
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: {
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },
  updatePassword: async (params) => {
    const isPasswordInvalid = params.password === "123456" || !params.password;

    if (isPasswordInvalid) {
      return {
        success: false,
        error: {
          message: "Update password failed",
          name: "Invalid password",
        },
      };
    }

    return {
      success: true,
    };
  },
  logout: async () => {
    Cookies.remove("auth", { path: "/" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
