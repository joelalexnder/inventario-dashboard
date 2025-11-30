import { useTable, List } from "@refinedev/antd";
import { Table, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export const CategoriaList = () => {
    const { tableProps, tableQuery } = useTable({
        resource: "categorias",
        syncWithLocation: false, 
        pagination: { 
            mode: "server",
            pageSize: 10 
        }, 
    });

    return (
        <List
            title="Categorías"
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
                rowKey="id" 
                
                pagination={{
                    ...tableProps.pagination,
                    showSizeChanger: true, 
                    pageSizeOptions: ["10", "20", "50", "100"],
                    showQuickJumper: false, 
                    showTotal: undefined,  
                    
                    itemRender: (page, type, originalElement) => {
                        if (type === 'page' || type === 'prev' || type === 'next' || type === 'jump-prev' || type === 'jump-next') {
                            return null;
                        }
                        return originalElement;
                    },
                    
                    position: ["bottomRight"],
                }}
                
                columns={[
                    {
                        title: "ID",
                        dataIndex: "id",
                        width: 80, 
                        align: "center",
                    },
                    {
                        title: "Categoría",
                        dataIndex: "nombre",
                        width: "auto", 
                    },
                    {
                        title: "Tienda ID",
                        dataIndex: "tiendaId",
                        width: 100,
                        align: "center",
                    },
                ]}
            />
        </List>
    );
};