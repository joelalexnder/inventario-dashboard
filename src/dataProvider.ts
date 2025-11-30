import type { DataProvider } from "@refinedev/core";
import { TOKEN_KEY, USER_KEY } from "./authProvider";

const API_URL = import.meta.env.VITE_API_URL;

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
    getList: async ({ resource, pagination }) => {
        try {
            const token = localStorage.getItem(TOKEN_KEY);
            const tiendaId = getTiendaId();
            const page = (pagination as any)?.current ?? 1;
            const size = (pagination as any)?.pageSize ?? 10;

            let url = `${API_URL}`;

            if (tiendaId) {
                if (resource === "productos") {
                    url += `/tiendas/${tiendaId}/productos`;
                } else if (resource === "categorias") {
                    url += `/tiendas/${tiendaId}/categorias`;
                } else if (resource === "auth") {
                    url += `/auth`;
                } else {
                    url += `/${resource}`;
                }
            } else {
                url += `/${resource}`;
            }

            // Paginación
            url += `?page=${page}&size=${size}`;

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

            if (Array.isArray(data.content)) {
                items = data.content;
                total = data.totalElements ?? data.content.length;
            } else if (Array.isArray(data.data)) {
                items = data.data;
                total = data.total ?? data.data.length;
            } else {
                throw new Error(`Respuesta de API inválida: ${JSON.stringify(data)}`);
            }

            return {
                data: items,
                total,
                pagination: {
                    current: page,
                    pageSize: size,
                },
            };

        } catch (error) {
            console.error(error);
            return {
                data: [],
                total: 0,
                pagination: {
                    current: 1,
                    pageSize: 10,
                },
            };
        }
    },

    getOne: async ({ resource, id }) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (resource === "auth") {
            const response = await fetch(`${API_URL}/auth?size=100`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al cargar la lista de empleados");
            }
            const data = await response.json();
            const usuarioEncontrado = data.content?.find((u: any) => u.id == id);

            if (!usuarioEncontrado) {
                throw new Error("Usuario no encontrado");
            }

            return { data: usuarioEncontrado };
        }
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

        return { data };
    },

    create: async ({ resource, variables }) => {
        const token = localStorage.getItem(TOKEN_KEY);
        const tiendaId = getTiendaId();
        let url = `${API_URL}`;

        
        if (resource === "auth") {
            url += `/auth`; 
        } 
        
        else if (tiendaId) {
            if (resource === "productos") {
                url += `/tiendas/${tiendaId}/productos`;
            } else if (resource === "categorias") {
                url += `/tiendas/${tiendaId}/categorias`;
            } else {
                url += `/${resource}`;
            }
        } else {
            url += `/${resource}`;
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(variables),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.msg || error.message || "Error al crear");
        }

        const data = await response.json();

        return {
            data: data.usuario || data, 
        };
    },


    update: async ({ resource, id, variables }) => {
        const token = localStorage.getItem(TOKEN_KEY);
        let url = `${API_URL}`;

        
        if (resource === "auth") {
            url += `/auth/${id}`;
        } else {
            url += `/${resource}/${id}`;
        }

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(variables),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.msg || "Error al actualizar");
        }

        const data = await response.json();

        return {
            data: data.usuario || data, 
        };
    },
    deleteOne: async ({ resource, id }) => {
        const token = localStorage.getItem(TOKEN_KEY);
        let url = `${API_URL}`;

        if (resource === "auth") {
            url += `/auth/${id}`;
        } else {
            url += `/${resource}/${id}`;
        }

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.msg || "Error al eliminar");
        }

        return {
            data: { id } as any, 
        };
    },

    getApiUrl: () => API_URL,
};
