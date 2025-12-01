import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método no permitido" })
  }

  const { userId, nuevoRol } = req.body

  try {
    const usuarioActualizado = await prisma.user.update({
      where: { id: userId },
      data: { role: nuevoRol },
    })

    return res.status(200).json(usuarioActualizado)
  } catch (error) {
    console.error("Error actualizando rol:", error)
    return res.status(500).json({ error: "No se pudo actualizar el rol del usuario" })
  }
}
