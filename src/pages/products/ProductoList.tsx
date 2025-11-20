import { useTable } from "@refinedev/antd";
import { Table } from "antd";

export const ProductsList = () => {

    const { tableProps } = useTable({
        resource: "productos",
        pagination: { mode: "server" },
    });

    const handleChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        tableProps.onChange?.(pagination, filters, sorter, extra);
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Productos</h2>

            <Table
                {...tableProps}
                pagination={{
                    ...tableProps.pagination,
                    showSizeChanger: true,     
                    showQuickJumper: false,    
                    showLessItems: true,       
                    itemRender: () => null,    
                    showTotal: undefined,    
                }}
                onChange={handleChange}
                rowKey={(record) => record.id ?? record.codigo_barras ?? record.nombre}
                columns={[
                    { title: "ID", dataIndex: "id", width: 60 },
                    { title: "Código", dataIndex: "codigo_barras", width: 120 },
                    { title: "Nombre", dataIndex: "nombre", width: 200 },

                    {
                        title: "Precio",
                        dataIndex: "precio",
                        width: 100,
                        render: (v: any) => `S/ ${Number(v || 0).toFixed(2)}`,
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

                    { title: "Categoría ID", dataIndex: "categoriaId", width: 100 },
                ]}
                scroll={{ x: 800 }}
            />
        </div>
    );
};
