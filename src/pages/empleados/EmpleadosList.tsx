import { useTable, List, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Tag, Switch, Space, Popconfirm } from "antd";
import { useUpdate } from "@refinedev/core";

export const EmpleadosList = () => {
    const { tableProps } = useTable({
        resource: "auth",
        syncWithLocation: false,
        pagination: { mode: "server" },
    });

    const { mutate: updateEmpleado } = useUpdate();

    const handleEstadoChange = (id: string | number, checked: boolean) => {
        updateEmpleado({
            resource: "auth",
            id: id,
            values: { activo: checked },
            successNotification: {
                message: `Usuario ${checked ? "activado" : "desactivado"} correctamente`,
                type: "success",
            },
            errorNotification: {
                message: "Error al cambiar estado",
                type: "error",
            }
        });
    };

    const handleChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        tableProps.onChange?.(pagination, filters, sorter, extra);
    };

    const getColorByRole = (roleName: string) => {
        switch (roleName) {
            case "admin_tienda":
            case "super_admin":
                return "red"; 
            case "admin_tienda_secundario":
                return "orange";
            case "empleado_tienda":
                return "blue"; 
            default:
                return "default";
        }
    };

    return (
        <List>
            <Table
                {...tableProps}
                rowKey="id"
                onChange={handleChange}
                pagination={{
                    ...tableProps.pagination,
                    
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100", "200", "300", "500", "1000", "1300", "1500", "2000", 2500, "3000", "5000", "10000"],
                    
                    itemRender: (page, type, originalElement) => {
                        if (type === 'page' || type === 'prev' || type === 'next' || type === 'jump-prev' || type === 'jump-next') {
                            return null;
                        }
                        return originalElement;
                    },

                    showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} empleados`,
                    
                    showQuickJumper: false,
                    position: ["bottomRight"],
                }}
                columns={[
                    { title: "ID", dataIndex: "id", width: 80 },
                    { title: "Email", dataIndex: "email" },
                    
                    {
                        title: "Rol",
                        dataIndex: "roles",
                        render: (roles: any[]) => (
                            <>
                                {roles?.map((rol) => (
                                    <Tag 
                                        color={getColorByRole(rol.nombre)} 
                                        key={rol.id}
                                        style={{ fontWeight: 500 }} 
                                    >
                                        {rol.nombre.replace(/_/g, " ").toUpperCase()}
                                    </Tag>
                                ))}
                            </>
                        ),
                    },
                    {
                        title: "Estado",
                        dataIndex: "activo",
                        render: (activo, record: any) => (
                            <Popconfirm
                                title={`¿Deseas ${activo ? "desactivar" : "activar"} este usuario?`}
                                onConfirm={() => handleEstadoChange(record.id, !activo)}
                                okText="Sí"
                                cancelText="No"
                            >
                                <Switch 
                                    checked={activo} 
                                    checkedChildren="Activo" 
                                    unCheckedChildren="Inactivo"
                                />
                            </Popconfirm>
                        ),
                    },
                    
                    { title: "Tienda ID", dataIndex: "tiendaId", width: 100 },

                    {
                        title: "Acciones",
                        dataIndex: "actions",
                        render: (_, record: any) => (
                            <Space>
                                <EditButton hideText size="small" recordItemId={record.id} />
                                <DeleteButton 
                                    hideText 
                                    size="small" 
                                    recordItemId={record.id}
                                    confirmTitle="¿Estás seguro de eliminar este empleado?"
                                    confirmOkText="Sí, eliminar"
                                    confirmCancelText="Cancelar"
                                />
                            </Space>
                        ),
                    },
                ]}
            />
        </List>
    );
};