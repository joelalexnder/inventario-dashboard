import React from "react";
import {
  Layout as AntdLayout,
  Menu,
  Button,
  Dropdown,
  ConfigProvider,
  theme as antdTheme,
} from "antd";
import { useLogout, useGetIdentity } from "@refinedev/core";
import { UserOutlined, LogoutOutlined, BulbOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";

const { Header, Sider, Content, Footer } = AntdLayout;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const { data: identity } = useGetIdentity();
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = React.useState(false);

  // 👉 Estado del tema
  const [themeMode, setThemeMode] = React.useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const menuItems = [
    { key: "/inicio", label: "Inicio", icon: "🏠" },
    { key: "/categorias", label: "Categorías", icon: "📁" },
    { key: "/productos", label: "Productos", icon: "📦" },
    { key: "/empleados", label: "Empleados", icon: "👥" },
  ];

  const selectedKey = menuItems.find((item) => item.key === pathname)?.key || "/categorias";

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeMode === "light"
            ? antdTheme.defaultAlgorithm
            : antdTheme.darkAlgorithm,
      }}
    >
      <AntdLayout style={{ minHeight: "100vh" }}>
        <Sider
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {!collapsed && "Dashboard"}
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              onClick: () => navigate(item.key),
            }))}
          />
        </Sider>

        <AntdLayout>
          <Header
            style={{
              padding: "0 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: themeMode === "light" ? "#fff" : "#141414",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              {menuItems.find((item) => item.key === pathname)?.label || "Dashboard"}
            </span>

            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              {/* BOTÓN CAMBIAR TEMA */}
              <Button
                type="text"
                icon={<BulbOutlined />}
                onClick={toggleTheme}
                title="Cambiar tema"
                style={{ fontSize: 18 }}
              />

              <Dropdown
                menu={{
                  items: [
                    {
                      key: "profile",
                      icon: <UserOutlined />,
                      label: `${identity?.name || "Usuario"}`,
                    },
                    { type: "divider" },
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "Cerrar sesión",
                      onClick: () => logout(),
                    },
                  ],
                }}
              >
                <Button type="text" icon={<UserOutlined />} size="large" />
              </Dropdown>
            </div>
          </Header>

          <Content style={{ margin: "24px 16px", minHeight: 280 }}>
            <div style={{ padding: "24px", borderRadius: "8px", background: themeMode === "light" ? "#fff" : "#1f1f1f" }}>
              {children}
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            © 2025 Inventario Dashboard. Todos los derechos reservados.
          </Footer>
        </AntdLayout>
      </AntdLayout>
    </ConfigProvider>
  );
};

