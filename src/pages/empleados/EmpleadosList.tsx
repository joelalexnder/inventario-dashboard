import { useTable } from "@refinedev/antd";
import { Table, Tag } from "antd";

export const EmpleadosList = () => {

    const { tableProps } = useTable({
        resource: "auth",
        pagination: { mode: "server" },
    });

    const handleChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        tableProps.onChange?.(pagination, filters, sorter, extra);
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Empleados</h2>

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
                rowKey="id"
                columns={[
                    { title: "ID", dataIndex: "id" },
                    { title: "Email", dataIndex: "email" },
                    {
                        title: "Estado",
                        dataIndex: "activo",
                        render: (activo) => (
                            <Tag color={activo ? "green" : "red"}>
                                {activo ? "Activo" : "Inactivo"}
                            </Tag>
                        ),
                    },
                    { title: "Tienda ID", dataIndex: "tiendaId" },
                ]}
            />
        </div>
    );
};
