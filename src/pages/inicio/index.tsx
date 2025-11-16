import { Card, Row, Col, Spin } from "antd";
import { useNavigate } from "react-router";
import { useList } from "@refinedev/core";

export default function DashboardHome() {
    const navigate = useNavigate();

    // Obtener datos
    const productosQuery = useList({
        resource: "productos",
        pagination: { mode: "off" },
    });

    const categoriasQuery = useList({
        resource: "categorias",
        pagination: { mode: "off" },
    });

    // --- datos corregidos ---
    const productos = productosQuery.result.data ?? [];
    const categorias = categoriasQuery.result.data ?? [];

    // --- cargando o error ---
    const isLoading = productosQuery.query.isLoading || categoriasQuery.query.isLoading;
    const isError = productosQuery.query.isError || categoriasQuery.query.isError;

    if (isLoading) return <Spin  style={{ margin: 40 }} />;
    if (isError) return <p>Error cargando dashboard</p>;

    // --- calculos ---
    const totalProductos = productos.length;
    const totalCategorias = categorias.length;
    const productosBajoStock = productos.filter(p => p.stock < 10).length;

    return (
        <div>
            <h1 style={{ fontSize: "26px", marginBottom: "20px", fontWeight: "600" }}>
                Dashboard de Inventario
            </h1>

            {/* TARJETAS DE RESUMEN */}
            <Row gutter={20}>
                
                {/* ✔ Productos */}
                <Col xs={24} md={8}>
                    <Card 
                        hoverable
                        onClick={() => navigate("/productos")}
                        style={{ 
                            borderRadius: 12,
                            borderLeft: "6px solid #1677ff"
                        }}
                    >
                        <h2>📦 Productos</h2>
                        <p style={{ fontSize: 28, fontWeight: "bold" }}>
                            {totalProductos}
                        </p>
                        <span>Ver productos</span>
                    </Card>
                </Col>

                {/* ✔ Categorías */}
                <Col xs={24} md={8}>
                    <Card 
                        hoverable
                        onClick={() => navigate("/categorias")}
                        style={{ 
                            borderRadius: 12,
                            borderLeft: "6px solid #13c2c2"
                        }}
                    >
                        <h2>📁 Categorías</h2>
                        <p style={{ fontSize: 28, fontWeight: "bold" }}>
                            {totalCategorias}
                        </p>
                        <span>Ver categorías</span>
                    </Card>
                </Col>

                {/* ⭐ Bajo stock */}
                <Col xs={24} md={8}>
                    <Card 
                        hoverable
                        onClick={() => navigate("/productos")}
                        style={{ 
                            borderRadius: 12,
                            background: "#fff1f0",
                            borderLeft: "6px solid #ff4d4f"
                        }}
                    >
                        <h2 style={{ color: "#a8071a" }}>⚠️ Bajo stock</h2>
                        <p style={{ fontSize: 28, fontWeight: "bold", color: "#cf1322" }}>
                            {productosBajoStock}
                        </p>
                        <span style={{ color: "#a8071a" }}>
                            Ver productos con bajo stock
                        </span>
                    </Card>
                </Col>

            </Row>

            {/* ACCESOS RÁPIDOS */}
            <h2 style={{ marginTop: "40px", marginBottom: "16px" }}>
                Accesos rápidos
            </h2>

            <Row gutter={20}>
                <Col xs={24} md={6}>
                    <Card hoverable onClick={() => navigate("/productos")}>
                        ➕ Agregar Producto (pronto)
                    </Card>
                </Col>

                <Col xs={24} md={6}>
                    <Card hoverable onClick={() => navigate("/categorias")}>
                        ➕ Nueva Categoría
                    </Card>
                </Col>

                <Col xs={24} md={6}>
                    <Card hoverable onClick={() => navigate("/empleados")}>
                        ➕ Nuevo Empleado
                    </Card>
                </Col>

                <Col xs={24} md={6}>
                    <Card hoverable>
                        ⚙️ Configuración (pronto)
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
