import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { Toaster } from "react-hot-toast";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Groups from "./pages/Groups";
import Lessons from "./pages/Lessons";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Course from "./pages/Course";

interface IUserData {
  name: string;
  uuid: string;
}
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });

  const authStore = createStore<IUserData>({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider store={authStore}>
        <ReactQueryDevtools />

        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:courseId" element={<Course />} />
              <Route path="groups" element={<Groups />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="users" element={<Users />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700",
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
