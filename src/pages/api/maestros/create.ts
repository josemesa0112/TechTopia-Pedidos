import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" })
  }

  try {
    const maestros = await prisma.maestro.findMany({
      include: {
        creador: true, // ← incluye el usuario que creó el maestro
      }
    })
    return res.status(200).json(maestros)
  } catch (error) {
    console.error("Error listando maestros:", error)
    return res.status(500).json({ error: "No se pudo obtener la lista de maestros" })
  }
}





