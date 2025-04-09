import { Outlet } from "react-router-dom";
import { SidebarProvider } from "./Sidebar";
import AppSidebar from "./AppSidebar";
import { Toaster } from "react-hot-toast";

export default function AppLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="grid w-full">
        <main className="overflow-scroll px-8 py-4">
          <Outlet />
        </main>
      </div>

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
    </SidebarProvider>
  );
}
