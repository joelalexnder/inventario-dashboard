import { useState } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { useLogin } from "@refinedev/core";

const { Title, Text } = Typography;

export const Login = () => {
    const { mutate: login } = useLogin();
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        login(values, {
            onSuccess: () => {
                message.success("Inicio de sesión exitoso");
                setLoading(false);
            },
            onError: () => {
                message.error("Credenciales incorrectas");
                setLoading(false);
            }
        });
    };

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#f5f6fa",
            }}
        >
            {/* Sección izquierda: formulario */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "40px",
                }}
            >
                <Card
                    style={{
                        width: 420,
                        borderRadius: 16,
                        padding: "24px",
                        boxShadow: "0 14px 30px rgba(0,0,0,0.15)",
                    }}
                >
                    <div style={{ textAlign: "center", marginBottom: 30 }}>
                        <Title level={2} style={{ marginBottom: 8, color: "#1e3c72" }}>
                            🛒 Inventario 
                        </Title>
        
                    </div>

                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label={<span style={{ fontWeight: 600 }}>Correo Electrónico</span>}
                            name="email"
                            rules={[
                                { required: true, message: "Ingrese su correo" },
                                { type: "email", message: "Correo inválido" },
                            ]}
                        >
                            <Input size="large" placeholder="admin@tienda.com" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontWeight: 600 }}>Contraseña</span>}
                            name="password"
                            rules={[{ required: true, message: "Ingrese su contraseña" }]}
                        >
                            <Input.Password size="large" placeholder="********" />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                            style={{
                                background: "#1e3c72",
                                borderRadius: 8,
                                marginTop: 10,
                                fontWeight: 600,
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </Form>
                </Card>
            </div>

            {/* Sección derecha: imagen */}
            <div
                style={{
                    flex: 1.2,
                    backgroundImage:
                        "url('https://images.prismic.io/simpliroute/56dc27da-0a15-4ad9-a9f4-74f095b4e815_sistema+de+inventarios.jpg?auto=compress,format')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                }}
            >
                {/* Overlay para dar estilo elegante */}
                <div
                    style={{
                        flex: 1,
                        background: "rgba(0,0,0,0.4)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: 32,
                        fontWeight: 600,
                        textShadow: "0px 3px 10px rgba(0,0,0,0.5)",
                    }}
                >
                    Sistema de Inventario 
                </div>
            </div>
        </div>
    );
};
