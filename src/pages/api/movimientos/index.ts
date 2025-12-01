import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" })
  }

  try {
    const transacciones = await prisma.movimiento.findMany({
      include: {
        maestro: true,   // si tu modelo tiene relación con Maestro
      },
    })
    console.log("Transacciones obtenidas:", transacciones)
    return res.status(200).json(transacciones)
  } catch (error) {
    console.error("Error listando transacciones:", error)
    return res.status(500).json({ error: "No se pudo obtener la lista de transacciones" })
  }
}
