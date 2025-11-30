import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" })
  }

  const { nombre, creadorId } = req.body

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio" })
  }
  if (!creadorId) {
    return res.status(400).json({ error: "El creadorId es obligatorio" })
  }

  try {
    const maestro = await prisma.maestro.create({
      data: {
        nombre: nombre.trim(),
        saldo: 0,
        creadorId: creadorId, // debe ser un ID válido de un usuario existente
      },
    })
    return res.status(201).json(maestro)
  } catch (error) {
    console.error("Error creando maestro:", error)
    return res.status(500).json({ error: "No se pudo crear el maestro" })
  }
}




