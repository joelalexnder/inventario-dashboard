import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { Authenticated } from "@refinedev/core";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Layout } from "./components/layout";
import { Navigate } from "react-router";

// Importar páginas
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { CategoriaList } from "./pages/categories/CategoriaList";
import { ProductsList } from "./pages/products/ProductoList";
import { EmpleadosList } from "./pages/empleados/EmpleadosList";
import DashboardHome from "./pages/inicio";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/",
                    meta: {
                      label: "Dashboard",
                    },
                  },
                  {
                    name: "categorias",
                    list: "/categorias",
                    meta: {
                      label: "Categorías",
                    },
                  },
                  {
                    name: "productos",
                    list: "/productos",
                    meta: {
                      label: "Productos",
                    },
                  },
                  {
                    name: "auth",
                    list: "/empleados",
                    meta: {
                      label: "Empleados",
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "ae5xBd-1su0pE-uFHGjn",
                }}
              >
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route
                    element={
                      <Authenticated
                        key="authenticated-wrapper"
                        redirectOnFail="/login"
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    {/* Ruta por defecto*/}
                    <Route path="/" element={<Navigate to="/inicio" replace />} />

                    <Route path="inicio" element={<DashboardHome />} />
                    <Route path="categorias" element={<CategoriaList />} />
                    <Route path="productos" element={<ProductsList />} />
                    <Route path="empleados" element={<EmpleadosList />} />

                    <Route path="*" element={<Navigate to="/inicio" replace />} />
                  </Route>

  
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
