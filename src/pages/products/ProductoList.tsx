import { useTable, List } from "@refinedev/antd";
import { Table, Tag, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export const ProductsList = () => {
    const { tableProps, tableQuery } = useTable({
        resource: "productos",
        pagination: { mode: "server" },
    });

    const handleChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        tableProps.onChange?.(pagination, filters, sorter, extra);
    };

    return (
        <List
            title="Productos"
            headerButtons={({ defaultButtons }) => (
                <>
                    <Button 
                        icon={<ReloadOutlined />} 
                        type="default"
                        onClick={() => tableQuery.refetch()}
                    >
                        Refrescar
                    </Button>
                    {defaultButtons}
                </>
            )}
        >
            <Table
                {...tableProps}
                pagination={{
                    ...tableProps.pagination,
                    showSizeChanger: true,     
                    showQuickJumper: false,    
                    showLessItems: true,       
                    itemRender: () => null,    
                    showTotal: undefined,      
                    position: ["bottomRight"]
                }}
                onChange={handleChange}
                rowKey={(record) => record.id ?? record.codigo_barras ?? record.nombre}
                columns={[
                    { title: "ID", dataIndex: "id", width: 60, align: "center" },
                    { title: "Código", dataIndex: "codigo_barras", width: 120 },
                    { title: "Nombre", dataIndex: "nombre", width: 200 },

                    {
                        title: "Precio",
                        dataIndex: "precio",
                        width: 100,
                        align: "right",
                        render: (v: any) => (
                            <span style={{ fontWeight: 500 }}>
                                S/ {Number(v || 0).toFixed(2)}
                            </span>
                        ),
                    },
                    {
                        title: "Stock",
                        dataIndex: "stock",
                        width: 100,
                        align: "center",
                        render: (value: number) => {
                            const isLow = value < 30;
                            
                            return (
                                <Tag 
                                    color={isLow ? "red" : "green"} 
                                >
                                    {value} {isLow ? "Bajo" : "Ud."}
                                </Tag>
                            );
                        },
                    },

                    { title: "Cat. ID", dataIndex: "categoriaId", width: 80, align: "center" },
                ]}
                scroll={{ x: 800 }}
            />
        </List>
    );
};