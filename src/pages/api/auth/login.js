// pages/api/auth/login.js
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña requeridos" })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
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
  } catch (err) {
    console.error("Error en login:", err)
    return res.status(500).json({ error: "Error interno del servidor" })
  }
}
