import { Card, Row, Col, Spin, Button, List, Tag, Typography, Avatar } from "antd";
import { useNavigate } from "react-router";
import { useList } from "@refinedev/core";
import { 
    UserAddOutlined, 
    ShoppingOutlined, 
    TagsOutlined, 
    AlertOutlined,
    RightOutlined 
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function DashboardHome() {
    const navigate = useNavigate();
    const productosQuery = useList({
        resource: "productos",
        pagination: { mode: "off" },
    });

    const categoriasQuery = useList({
        resource: "categorias",
        pagination: { mode: "off" },
    });
    
    const productos = productosQuery.result.data ?? [];
    const categorias = categoriasQuery.result.data ?? [];
    
    const isLoading = productosQuery.query.isLoading || categoriasQuery.query.isLoading;
    const isError = productosQuery.query.isError || categoriasQuery.query.isError;

    if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}><Spin size="large"/></div>;
    if (isError) return <p>Error cargando dashboard</p>;
    
    const totalProductos = productos.length;
    const totalCategorias = categorias.length;
    const listaBajoStock = productos.filter(p => Number(p.stock) < 30);
    const conteoBajoStock = listaBajoStock.length;
    const topCriticos = listaBajoStock.slice(0, 5);

    return (
        <div style={{ padding: "24px" }}>
            <Title level={2} style={{ marginBottom: "24px", color: "#262626" }}>
                Panel de Control
            </Title>

            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={8}>
                    <Card hoverable onClick={() => navigate("/productos")} style={cardStyle("#1677ff")}>
                        <StatisticContent 
                            icon={<ShoppingOutlined />} 
                            color="#1677ff" 
                            title="Productos" 
                            value={totalProductos} 
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card hoverable onClick={() => navigate("/categorias")} style={cardStyle("#13c2c2")}>
                        <StatisticContent 
                            icon={<TagsOutlined />} 
                            color="#13c2c2" 
                            title="Categorías" 
                            value={totalCategorias} 
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card hoverable onClick={() => navigate("/productos")} style={cardStyle("#ff4d4f", "#fff1f0")}>
                        <StatisticContent 
                            icon={<AlertOutlined />} 
                            color="#ff4d4f" 
                            title="Stock Crítico" 
                            value={conteoBajoStock} 
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} md={10} lg={8}>
                    <Card 
                        hoverable
                        style={{ 
                            height: '100%', 
                            borderRadius: 16,
                            background: 'linear-gradient(135deg, #096dd9 0%, #1890ff 100%)', 
                            border: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: 'center',
                            color: 'white'
                        }}
                        bodyStyle={{ padding: "40px 20px" }}
                        onClick={() => navigate("/empleados/create")} 
                    >
                        <Avatar 
                            size={80} 
                            icon={<UserAddOutlined />} 
                            style={{ backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 20 }} 
                        />
                        <Title level={3} style={{ color: 'white', margin: 0 }}>
                            Nuevo Empleado
                        </Title>
                        <Text style={{ color: 'rgba(255,255,255,0.85)', display: 'block', marginTop: 8, marginBottom: 24, fontSize: 16 }}>
                            Registra personal y gestiona accesos al sistema.
                        </Text>
                        <Button 
                            size="large" 
                            shape="round"
                            style={{ height: 48, padding: '0 40px', fontSize: 16, border: 'none', color: '#096dd9' }}
                        >
                            Crear ahora
                        </Button>
                    </Card>
                </Col>
                <Col xs={24} md={14} lg={16}>
                    <Card 
                        title={<span style={{ fontWeight: 600 }}>Atención Inmediata (Stock Bajo)</span>}
                        extra={<Button type="link" onClick={() => navigate("/productos")}>Ver todos <RightOutlined /></Button>}
                        style={{ borderRadius: 16, height: '100%' }}
                    >
                        {topCriticos.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: 30, color: '#52c41a' }}>
                                <ShoppingOutlined style={{ fontSize: 30 }} />
                                <p style={{ marginTop: 10 }}>Todo el inventario está correcto.</p>
                            </div>
                        ) : (
                            <List
                                itemLayout="horizontal"
                                dataSource={topCriticos}
                                renderItem={(item: any) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar style={{ backgroundColor: '#fff1f0', color: '#cf1322' }}>!</Avatar>}
                                            title={<Text strong>{item.nombre}</Text>}
                                            description={`Código: ${item.codigo_barras || 'N/A'}`}
                                        />
                                        <div style={{ textAlign: 'right' }}>
                                            <Text type="secondary" style={{ fontSize: 12 }}>Stock actual</Text>
                                            <br />
                                            <Tag color="red" style={{ fontSize: 14, padding: "2px 10px" }}>
                                                {item.stock} uds.
                                            </Tag>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

const cardStyle = (color: string, bg?: string) => ({
    borderRadius: 12,
    borderLeft: `6px solid ${color}`,
    background: bg || '#fff',
    cursor: 'pointer'
});

const StatisticContent = ({ icon, color, title, value }: any) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <h3 style={{ fontSize: 16, margin: 0, color: '#8c8c8c', fontWeight: 500 }}>{title}</h3>
            <span style={{ fontSize: 36, fontWeight: "bold", color: '#262626' }}>{value}</span>
        </div>
        <div style={{ 
            fontSize: 32, 
            color: color, 
            background: `${color}15`, 
            padding: 12, 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {icon}
        </div>
    </div>
);