import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const EmpleadosCreate = () => {
    const { formProps, saveButtonProps } = useForm({
        resource: "auth", 
        redirect: "list",
    });

    return (
        <Create saveButtonProps={saveButtonProps} title="Registrar Nuevo Usuario">
            <Form 
                {...formProps} 
                layout="vertical"
                style={{ maxWidth: 500 }}
                
                initialValues={{
                    rolNombre: "empleado_tienda", 
                    activo: true
                }}
            >
                <Form.Item
                    label="Correo Electrónico"
                    name="email"
                    rules={[
                        { required: true, message: "El correo es obligatorio" },
                        { type: "email", message: "Ingresa un correo válido" }
                    ]}
                >
                    <Input placeholder="usuario@mitienda.com" />
                </Form.Item>

                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: "La contraseña es obligatoria" }]}
                >
                    <Input.Password placeholder="********" />
                </Form.Item>

                <Form.Item
                    label="Nivel de Acceso (Rol)"
                    name="rolNombre"
                    rules={[{ required: true, message: "Debes asignar un rol" }]}
                    tooltip="Define los permisos del usuario dentro de la aplicación" 
                >
                    <Select
                        placeholder="Selecciona el rol"
                        options={[
                            { 
                                value: "empleado_tienda", 
                                label: "📦 Empleado (Vendedor)" 
                            },
                            { 
                                value: "admin_tienda_secundario", 
                                label: "🛠️ Admin Secundario" 
                            },
                        ]}
                    />
                </Form.Item>

            </Form>
        </Create>
    );
};