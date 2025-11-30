// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña requeridos" })
  }

  try {
    const emailClean = email.trim().toLowerCase()
    
    const user = await prisma.user.findUnique({ where: { email: emailClean } })

    console.log("USUARIO ENCONTRADO:", user)

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" })
    }

    // Comparación directa sin bcrypt
    if (password !== user.password) {
      console.log("CONTRASEÑA ENVIADA:", password, "CONTRASEÑA EN BD:", user.password)
      return res.status(401).json({ error: "Credenciales inválidas" })
    }

    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err: any) {
    console.error("Error en login:", err)
    return res.status(500).json({ error: "Error interno del servidor" })
  }
}

