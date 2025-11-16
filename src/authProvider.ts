// src/authProvider.ts
import type { AuthProvider } from "@refinedev/core";
import axios from "axios";

const API_URL = "https://proyecto-aws-backend-production.up.railway.app";
export const TOKEN_KEY = "auth-token";
export const USER_KEY = "auth-user";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, usuario } = res.data;

      if (!token) {
        return {
          success: false,
          error: {
            name: "LoginError",
            message: "Token no recibido desde el servidor",
          },
        };
      }

      
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(usuario));

      return {
        success: true,
        redirectTo: "/inicio",
      };
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Error al iniciar sesión";

      return {
        success: false,
        error: {
          name: "LoginError",
          message,
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);

        // Verificar que sea admin de la tienda
        if (!user.roles?.includes("admin_tienda")) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          return {
            authenticated: false,
            redirectTo: "/login",
          };
        }
        return {
          authenticated: true,
        };
      } catch {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }
    }

    // Si no hay token ni usuario, no está autenticado
    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },

  getIdentity: async () => {
    const userStr = localStorage.getItem(USER_KEY);

    if (!userStr) return null;

    try {
      const user = JSON.parse(userStr);
      return {
        id: user.id,
        name: user.email,
        tiendaId: user.tiendaId,
        roles: user.roles,
      };
    } catch {
      return null;
    }
  },

  getPermissions: async () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user.roles;
  },

  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
