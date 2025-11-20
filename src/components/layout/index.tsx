import React from "react";
import {
  Layout as AntdLayout,
  Menu,
  Button,
  Dropdown,
  ConfigProvider,
  theme as antdTheme,
} from "antd";

import {
  HomeOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  BulbOutlined,
} from "@ant-design/icons";

import { useLogout, useParsed } from "@refinedev/core";
import { useNavigate } from "react-router";

const { Header, Sider, Content, Footer } = AntdLayout;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const { pathname } = useParsed();

  const [collapsed, setCollapsed] = React.useState(false);
  const [themeMode, setThemeMode] = React.useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  
  const identity = JSON.parse(localStorage.getItem("auth-user") || "{}");
  const displayName = identity?.email ? identity.email.split("@")[0] : "Usuario";

  
  const menuItems = [
    { key: "/inicio", label: "Inicio", icon: <HomeOutlined /> },
    { key: "/categorias", label: "Categorías", icon: <AppstoreOutlined /> },
    { key: "/productos", label: "Productos", icon: <ShoppingOutlined /> },
    { key: "/empleados", label: "Empleados", icon: <TeamOutlined /> },
  ];

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
        {/* SIDEBAR */}
        <Sider
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            background: "linear-gradient(180deg, #001529 0%, #000c17 100%)",
          }}
        >
          {/* LOGO */}
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            {!collapsed ? "Inventario" : "INV"}
          </div>

          {/* MENÚ */}
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname ?? ""]}
            style={{ borderRight: "none" }}
            items={menuItems.map((item) => ({
              ...item,
              style: {
                margin: "4px 8px",
                borderRadius: "6px",
              },
              onClick: () => navigate(item.key),
            }))}
          />
        </Sider>

        {/* CONTENIDO PRINCIPAL */}
        <AntdLayout>
          {/* HEADER */}
          <Header
            style={{
              padding: "0 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: themeMode === "light" ? "#fff" : "#141414",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                themeMode === "light"
                  ? "0 2px 4px rgba(0,0,0,0.08)"
                  : "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              {menuItems.find((item) => item.key === pathname)?.label ||
                "Dashboard"}
            </span>

            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
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
                      label: displayName,
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

          {/* CONTENT */}
          <Content style={{ margin: "24px 16px", minHeight: 280 }}>
            <div
              style={{
                padding: "24px",
                borderRadius: "8px",
                background:
                  themeMode === "light" ? "#fff" : "#1f1f1f",
              }}
            >
              {children}
            </div>
          </Content>

          {/* FOOTER */}
          <Footer style={{ textAlign: "center" }}>
            © 2025 Inventario Dashboard. Todos los derechos reservados.
          </Footer>
        </AntdLayout>
      </AntdLayout>
    </ConfigProvider>
  );
};
