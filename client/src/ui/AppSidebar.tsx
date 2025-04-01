import { Home, Folders, Users, ClipboardList, Sheet } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/Sidebar";
import { NavLink } from "react-router-dom";

const items = [
  {
    title: "Головна",
    url: "home",
    icon: Home,
  },
  {
    title: "Курси",
    url: "courses",
    icon: Folders,
  },
  {
    title: "Групи",
    url: "groups",
    icon: Users,
  },
  {
    title: "Заняття",
    url: "lessons",
    icon: Sheet,
  },
  {
    title: "Завдання",
    url: "tasks",
    icon: ClipboardList,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>LMS</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Навігація</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        tooltip={item.title}
                        asChild
                        isActive={isActive}
                      >
                        <div>
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>User</SidebarFooter>
    </Sidebar>
  );
}
