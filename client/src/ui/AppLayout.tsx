import { Outlet } from "react-router-dom";
import { SidebarProvider } from "./Sidebar";
import AppSidebar from "./AppSidebar";

export default function AppLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="grid w-full">
        <main className="overflow-scroll">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
