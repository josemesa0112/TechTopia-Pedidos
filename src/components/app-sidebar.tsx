import * as React from "react"
import {
  IconDashboard,
  IconUsers,
  IconDatabase,
  IconChartBar,
  IconReport,
  IconLogout,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavUser } from "@/components/nav-user"
import { NavMain } from "@/components/nav-main"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const navMain = [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Usuarios", url: "/usuarios", icon: IconUsers },
    { title: "Maestros", url: "/maestros", icon: IconDatabase },
    { title: "Transacciones", url: "/transacciones", icon: IconChartBar },
    { title: "Reportes", url: "/reportes", icon: IconReport },
  ]

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Header con logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <img src="/LOGOTAREAS.png" alt="Logo" className="h-10" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navegación principal */}
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      {/* Footer con usuario y logout */}
      <SidebarFooter>
        <div className="flex items-center justify-between w-full px-4">
          <NavUser
            user={{
              name: user?.name || "Usuario",
              email: user?.email || "",
              avatar: "/avatar.png",
            }}
          />
          <button
            onClick={() => {
              localStorage.removeItem("user")
              window.location.href = "/login"
            }}
            title="Cerrar sesión"
          >
            <IconLogout className="w-6 h-6 text-red-500 hover:text-red-600 transition" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

