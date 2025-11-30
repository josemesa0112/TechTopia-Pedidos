import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" })
  }

  const { nombre, saldo, creadorId } = req.body

  console.log("Datos recibidos:", { nombre, saldo, creadorId })

  // Validaciones
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio y debe ser texto" })
  }

  if (typeof saldo !== "number" || isNaN(saldo)) {
    return res.status(400).json({ error: "El saldo debe ser un número válido" })
  }

  if (!creadorId || typeof creadorId !== "number") {
    return res.status(400).json({ error: "El creadorId es obligatorio y debe ser un número" })
  }

  try {
    const maestro = await prisma.maestro.create({
      data: {
        nombre: nombre.trim(),
        saldo,
        creadorId,
      },
    })

    console.log("Maestro creado:", maestro)

    return res.status(201).json(maestro)
  } catch (error) {
    console.error("Error creando maestro:", error)
    return res.status(500).json({ error: "No se pudo crear el maestro" })
  }
}






