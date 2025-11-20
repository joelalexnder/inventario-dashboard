import { useTable } from "@refinedev/antd";
import { Table, Button, Space } from "antd";

export const CategoriaList = () => {
    const { tableQuery } = useTable({
        resource: "categorias",
        pagination: { mode: "off" },
    });

    const data = tableQuery.data?.data ?? [];
    const dataWithKeys = data.map((item: any, index: number) => ({
        __rowKey: item.id ?? `${item.tiendaId ?? '0'}-${item.nombre ?? index}`,
        ...item,
    }));
    const isLoading = tableQuery.isLoading;
    const isError = tableQuery.isError;

    return (
        <div style={{ padding: 20 }}>
            <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <h2 style={{ margin: 0 }}>Categorías</h2>
                <div>
                    <Button type="default" onClick={() => tableQuery.refetch()} style={{ marginRight: 8 }}>
                        Refrescar
                    </Button>
                </div>
            </Space>

            <Table
                dataSource={dataWithKeys}
                rowKey={(record) => record.__rowKey}
                loading={isLoading}
                pagination={false}
                columns={[
                    {
                        title: "ID",
                        dataIndex: "id",
                    },
                    {
                        title: "Categoría",
                        dataIndex: "nombre",
                    },
                    {
                        title: "Tienda ID",
                        dataIndex: "tiendaId",
                    },
                ]}
            />

            {isError && <p style={{ color: "red" }}>Error al cargar categorías</p>}

            {!isLoading && dataWithKeys.length === 0 && (
                <p>No hay categorías para mostrar. Si acabas de crear una categoría desde el backend, haz click en "Refrescar" o recarga la página.</p>
            )}
        </div>
    );
};
