import { useTable } from "@refinedev/antd";
import { Table, Tag } from "antd";

export const EmpleadosList = () => {
    const { tableQuery } = useTable({
        resource: "auth",
        pagination: { mode: "off" },
    });

    const data = tableQuery.data?.data ?? [];
    const isLoading = tableQuery.isLoading;
    const isError = tableQuery.isError;

    // Obtener info del usuario logueado
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <div style={{ padding: 20 }}>
            <h2>Empleados</h2>

            <Table
                dataSource={data}
                rowKey={(record) => record.id ?? record.email}
                loading={isLoading}
                pagination={false}
                columns={[
                    {
                        title: "ID",
                        dataIndex: "id",
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                        render: (email, record) => {
                            const isCurrent = record.id === currentUser.id;

                            return (
                                <span style={{ fontWeight: isCurrent ? "bold" : "normal" }}>
                                    {email}{" "}
                                    {isCurrent && (
                                        <Tag color="blue" style={{ marginLeft: 8 }}>
                                            Tú
                                        </Tag>
                                    )}
                                </span>
                            );
                        }
                    },
                    {
                        title: "Estado",
                        dataIndex: "activo",
                        render: (activo: boolean) => (
                            <Tag color={activo ? "green" : "red"}>
                                {activo ? "Activo" : "Inactivo"}
                            </Tag>
                        ),
                    },
                    {
                        title: "Tienda ID",
                        dataIndex: "tiendaId",
                    },
                ]}
            />

            {isError && <p style={{ color: "red" }}>Error al cargar empleados</p>}
        </div>
    );
};
