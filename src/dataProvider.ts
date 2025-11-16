import type { DataProvider } from "@refinedev/core";
import { TOKEN_KEY, USER_KEY } from "./authProvider";

const API_URL = "https://proyecto-aws-backend-production.up.railway.app";

const getTiendaId = () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
        const user = JSON.parse(userStr);
        return user.tiendaId;
    } catch {
        return null;
    }
};

export const dataProvider: DataProvider = {
    getList: async ({ resource }) => {
        try {
            const token = localStorage.getItem(TOKEN_KEY);
            const tiendaId = getTiendaId();

            let url = `${API_URL}`;

            if (tiendaId) {
                if (resource === "productos") {
                    url += `/tiendas/${tiendaId}/productos`;
                } else if (resource === "categorias") {
                    url += `/tiendas/${tiendaId}/categorias`;
                } else if (resource === "auth") {
                    url += `/tiendas/${tiendaId}/usuarios`;
                } else {
                    url += `/${resource}`;
                }
            } else {
                url += `/${resource}`;
            }

            const response = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error al obtener ${resource}`);
            }

            const data = await response.json();

            let items: any[] = [];
            let total = 0;

            // 🔥 ESTA ES LA PARTE CLAVE PARA TU BACKEND
            if (Array.isArray(data.content)) {
                items = data.content;
                total = data.totalElements ?? data.content.length;
            } else if (Array.isArray(data.data)) {
                items = data.data;
                total = data.total ?? data.data.length;
            } else if (Array.isArray(data.rows)) {
                items = data.rows;
                total = data.count ?? data.rows.length;
            } else if (Array.isArray(data)) {
                items = data;
                total = data.length;
            } else {
                items = [data];
                total = 1;
            }

            return {
                data: items,
                total,
            };
        } catch (error) {
            console.error("dataProvider error:", error);
            throw error;
        }
    },

    getOne: async ({ resource, id }) => {
        const token = localStorage.getItem(TOKEN_KEY);

        const response = await fetch(`${API_URL}/${resource}/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener ${resource}/${id}`);
        }

        const data = await response.json();

        return {
            data,
        };
    },

    create: async () => {
        throw new Error("Operación no permitida");
    },

    update: async () => {
        throw new Error("Operación no permitida");
    },

    deleteOne: async () => {
        throw new Error("Operación no permitida");
    },

    getApiUrl: () => API_URL,
};
