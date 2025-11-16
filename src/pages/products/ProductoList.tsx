import { useTable } from "@refinedev/antd";
import { Table } from "antd";

export const ProductsList = () => {
    const { tableQuery } = useTable({
        resource: "productos",
        pagination: { mode: "off" },
    });

    const data = tableQuery.data?.data ?? [];
    const isLoading = tableQuery.isLoading;
    const isError = tableQuery.isError;

    return (
        <div style={{ padding: 20 }}>
            <h2>Productos</h2>

            <Table
                loading={isLoading}
                dataSource={data}
                rowKey={(record) => record.id ?? record.codigo_barras ?? record.nombre}
                pagination={false}
                columns={[
                    { 
                        title: "ID", 
                        dataIndex: "id",
                        width: 60,
                    },
                    { 
                        title: "Código", 
                        dataIndex: "codigo_barras",
                        width: 120,
                    },
                    { 
                        title: "Nombre", 
                        dataIndex: "nombre",
                        width: 200,
                    },
                    {
                        title: "Precio",
                        dataIndex: "precio",
                        width: 100,
                        render: (v: any) => {
                            const num = Number(v);
                            return `S/ ${isNaN(num) ? "0.00" : num.toFixed(2)}`;
                        },
                    },

                    {
                        title: "Stock",
                        dataIndex: "stock",
                        width: 100,
                        render: (value: number) => (
                            <span
                                style={{
                                    color: value < 10 ? "red" : "inherit",
                                    fontWeight: value < 10 ? "bold" : "normal",
                                }}
                            >
                                {value} {value < 10 ? "⚠ Bajo stock" : ""}
                            </span>
                        ),
                    },

                    { 
                        title: "Categoría ID", 
                        dataIndex: "categoriaId",
                        width: 100,
                    },
                ]}
                scroll={{ x: 800 }}
            />

            {isError && <p style={{ color: "red" }}>Error al cargar productos</p>}
        </div>
    );
};
