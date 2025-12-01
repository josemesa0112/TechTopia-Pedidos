import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" })
  }

  try {
    const movimientos = await prisma.movimiento.findMany({
      include: {
        maestro: true,       // incluir datos del maestro
        responsable: true,   // incluir datos del usuario responsable
      },
      orderBy: {
        createdAt: "asc",   // opcional: ordena del más reciente al más antiguo
      },
    })
    console.log("Movimientos obtenidos:", movimientos)
    return res.status(200).json(movimientos)
  } catch (error) {
    console.error("Error listando movimientos:", error)
    return res.status(500).json({ error: "No se pudo obtener la lista de movimientos" })
  }
}

