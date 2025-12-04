import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" })
  }

  try {
    const maestros = await prisma.maestro.findMany({
      include: {
        creador: true, // incluir datos del usuario creador si la relación está definida
      },
      orderBy: {
        id: "desc",   // opcional: ordena del más reciente al más antiguo
      },
    })
    console.log("Maestros obtenidos:", maestros) 
    return res.status(200).json(maestros)
  } catch (error) {
    console.error("Error listando maestros:", error)
    return res.status(500).json({ error: "No se pudo obtener la lista de maestros" })
  }
}
