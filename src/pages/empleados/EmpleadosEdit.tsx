import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const EmpleadosEdit = () => {
    const { formProps, saveButtonProps } = useForm({
        resource: "auth",
        redirect: "list",
        queryOptions: {
            select: ({ data }) => {
                const usuario = data;
                return {
                    data: {
                        ...usuario,
                        rolNombre: usuario.roles?.[0]?.nombre || "empleado_tienda",
                    },
                };
            },
        },
    });

    return (
        <Edit saveButtonProps={saveButtonProps} title="Editar Empleado">
            <Form 
                {...formProps} 
                layout="vertical" 
                style={{ maxWidth: 500 }}
            >
                
                <Form.Item
                    label="Correo Electrónico"
                    name="email"
                    rules={[
                        { required: true, message: "El correo es obligatorio" },
                        { type: "email", message: "Ingresa un correo válido" }
                    ]}
                >
                    <Input placeholder="usuario@tienda.com" />
                </Form.Item>

                <Form.Item
                    label="Nivel de Acceso (Rol)"
                    name="rolNombre"
                    rules={[{ required: true, message: "El rol es obligatorio" }]}
                    tooltip="Define los permisos del usuario dentro de la aplicación"
                >
                    <Select
                        placeholder="Selecciona un rol"
                        options={[
                            { 
                                value: "empleado_tienda", 
                                label: "Empleado" 
                            },
                            { 
                                value: "admin_tienda_secundario", 
                                label: "Supervisor" 
                            },
                        ]}
                    />
                </Form.Item>

            </Form>
        </Edit>
    );
};