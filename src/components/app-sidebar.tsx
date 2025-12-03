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
  const [usuariosCount, setUsuariosCount] = React.useState<number>(0)
  const [maestrosCount, setMaestrosCount] = React.useState<number>(0)
  const [transaccionesCount, setTransaccionesCount] = React.useState<number>(0)

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const fetchUsuarios = async () => {
      try {
        const res = await fetch("/api/usuarios")
        const data = await res.json()
        setUsuariosCount(Array.isArray(data) ? data.length : 0)
      } catch {
        setUsuariosCount(0)
      }
    }

    const fetchMaestros = async () => {
      try {
        const res = await fetch("/api/maestros")
        const data = await res.json()
        setMaestrosCount(Array.isArray(data) ? data.length : 0)
      } catch {
        setMaestrosCount(0)
      }
    }

    const fetchTransacciones = async () => {
      try {
        const res = await fetch("/api/transacciones")
        const data = await res.json()
        setTransaccionesCount(Array.isArray(data) ? data.length : 0)
      } catch {
        setTransaccionesCount(0)
      }
    }

    fetchUsuarios()
    fetchMaestros()
    fetchTransacciones()
  }, [])

  const navMain = [
    {
      title: `Empleados (${usuariosCount})`,
      url: "/dashboard/usuarios",
      icon: IconUsers,
    },
    {
      title: `Clientes (${maestrosCount})`,
      url: "/dashboard/maestros",
      icon: IconDatabase,
    },
    {
      title: `Compras (${transaccionesCount})`,
      url: "/dashboard/transacciones",
      icon: IconChartBar,
    },
    { title: "Productos", url: "/dashboard/productos", icon: IconDatabase },
  ]

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Header con logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <img src="/TechTopia.png" alt="Logo" className="h-100" />
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
