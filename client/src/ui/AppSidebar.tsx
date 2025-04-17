import {
  Home,
  Folders,
  Users,
  ClipboardList,
  Sheet,
  Settings,
  SquareUser,
} from "lucide-react";

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
  SidebarSeparator,
} from "../ui/Sidebar";
import { NavLink } from "react-router-dom";
import ShortUser from "../features/account/ShortUser";
import { useAuth } from "../contexts/Auth/useAuth";

const items = [
  {
    title: "Головна",
    url: "/home",
    icon: Home,
  },
  {
    title: "Курси",
    url: "/courses",
    icon: Folders,
  },
  {
    title: "Групи",
    url: "/groups",
    icon: Users,
  },
  {
    title: "Заняття",
    url: "/lessons",
    icon: Sheet,
  },
  {
    title: "Завдання",
    url: "/tasks",
    icon: ClipboardList,
  },
];

const adminItems = [
  {
    title: "Користувачі",
    url: "/lms-admin-route/users",
    icon: SquareUser,
  },
  {
    title: "Налаштування",
    url: "/lms-admin-route/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const { user } = useAuth();
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
              {user?.is_superuser && (
                <>
                  <SidebarSeparator />
                  {adminItems.map((item) => (
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
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <ShortUser />
      </SidebarFooter>
    </Sidebar>
  );
}
