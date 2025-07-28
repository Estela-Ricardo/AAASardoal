// src/App.tsx
import {
  Refine,

  Authenticated,
} from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";


import {
  AuthPage,
  ErrorComponent,
  useNotificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import { dataProvider, liveProvider } from "@refinedev/supabase";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import {
  AssociateCreate,
  AssociateEdit,
  AssociateList,
  AssociateShow,
} from "./pages/associates";
import {
  VolunteerList,
  VolunteerCreate,
  VolunteerEdit,
  VolunteerShow,
} from "./pages/volunteers";
import {
  EventList,
  EventCreate,
  EventEdit,
  EventShow,
} from "./pages/events";
import {
  FeedAidRequestList,
  FeedAidRequestCreate,
  FeedAidRequestEdit,
  FeedAidRequestShow,
} from "./pages/feedAidRequests";
import { AppIcon } from "./components/app-icon";
import { supabaseClient } from "./utility";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import authProvider from "./authProvider";
import { i18nProvider } from "./i18n";
import { Helmet } from "react-helmet";
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import SosOutlinedIcon from '@mui/icons-material/SosOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import { Home } from "./pages/Home";



function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerBindings}
                notificationProvider={useNotificationProvider}
                resources={[
                  {
                    name: "associates_full",
                    list: "/associates",
                    meta: {
                      label: "Associados",
                      icon: <Diversity3OutlinedIcon />,
                      canDelete: false,
                    },
                  },
                  {
                    name: "associates",
                    create: "/associates/create",
                    show: "/associates/show/:id",
                    edit: "/associates/edit/:id",
                    meta: {
                      label: "Associados",
                      canDelete: true,
                    },
                  },
                  {
                    name: "volunteers_full",
                    list: "/volunteers",
                    meta: {
                      label: "Voluntários",
                      icon: <VolunteerActivismOutlinedIcon />,
                      canDelete: false,
                    },
                  },
                  {
                    name: "volunteers",
                    create: "/volunteers/create",
                    edit: "/volunteers/edit/:id",
                    show: "/volunteers/show/:id",
                    meta: {
                      label: "Voluntários",
                      canDelete: true,
                    },
                  },
                  {
                    name: "events",
                    list: "/events",
                    create: "/events/create",
                    edit: "/events/edit/:id",
                    show: "/events/show/:id",
                    meta: {
                      label: "Eventos",
                      icon: <EventAvailableOutlinedIcon />,
                      canDelete: true,
                    },
                  },
                  {
                    name: "feedaidrequests",
                    list: "/feedaidrequests",
                    create: "/feedaidrequests/create",
                    edit: "/feedaidrequests/edit/:id",
                    show: "/feedaidrequests/show/:id",
                    meta: {
                      label: "Pedidos de Apoio",
                      icon: <SosOutlinedIcon />,
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  liveMode: "off", //Notifications off?
                  projectId: "kgQdB7-NZPZeB-iolpQr",
                  title: { text: "AAA Sardoal", icon: <AppIcon /> },
                }}
                i18nProvider={i18nProvider}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Header={Header}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<Home />}
                    />
                    <Route path="/associates">
                      <Route index element={<AssociateList />} />
                      <Route path="create" element={<AssociateCreate />} />
                      <Route path="edit/:id" element={<AssociateEdit />} />
                      <Route path="show/:id" element={<AssociateShow />} />
                    </Route>
                    <Route path="/volunteers">
                      <Route index element={<VolunteerList />} />
                      <Route path="create" element={<VolunteerCreate />} />
                      <Route path="edit/:id" element={<VolunteerEdit />} />
                      <Route path="show/:id" element={<VolunteerShow />} />
                    </Route>
                    <Route path="/events">
                      <Route index element={<EventList />} />
                      <Route path="create" element={<EventCreate />} />
                      <Route path="edit/:id" element={<EventEdit />} />
                      <Route path="show/:id" element={<EventShow />} />
                    </Route>
                    <Route path="/feedAidRequests">
                      <Route index element={< FeedAidRequestList />} />
                      <Route path="create" element={< FeedAidRequestCreate />} />
                      <Route path="edit/:id" element={< FeedAidRequestEdit />} />
                      <Route path="show/:id" element={< FeedAidRequestShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    {/* Public routes - ATTENTION!!! */}
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                          registerLink={false}

                          formProps={{
                            defaultValues: {
                              email: "info@refine.dev",
                              password: "refine-supabase",
                            },
                          }}
                        />
                      }
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler
                  handler={({ resource, action }) => {
                    const label = resource?.meta?.label || "AAA Sardoal";
                    const formattedAction =
                      action === "list" ? "| Listagem" :
                        action === "edit" ? "| Editar" :
                          action === "create" ? "| Criar" :
                            action === "show" ? "| Detalhes" :
                              action ?? "";

                    return `${label}  ${formattedAction}`;
                  }}
                />

              </Refine>
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
