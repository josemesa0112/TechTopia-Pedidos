import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" })
  }

  try {
    const usuarios = await prisma.user.findMany()
    console.log("Usuarios obtenidos:", usuarios) // 👈 log para depurar
    return res.status(200).json(usuarios)
  } catch (error) {
    console.error("Error listando usuarios:", error)
    return res.status(500).json({ error: "No se pudo obtener la lista de usuarios" })
  }
}
