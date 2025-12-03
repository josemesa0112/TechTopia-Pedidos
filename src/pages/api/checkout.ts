import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { form, productos, responsableId } = req.body as {
    form: {
      nombre: string
      email: string
      telefono: string
      direccion: string
    }
    productos: { id: number; nombre: string; precio: number }[]
    responsableId: number
  }

  try {
    // 1. Buscar maestro por nombre
    let maestro = await prisma.maestro.findFirst({
      where: { nombre: form.nombre },
    })

    // 2. Si no existe, crearlo
    if (!maestro) {
      maestro = await prisma.maestro.create({
        data: {
          nombre: form.nombre,
          saldo: 0,
          creadorId: responsableId,
        },
      })
    }

    // 3. Calcular total
    const subtotal = productos.reduce((acc: number, p) => acc + p.precio, 0)
    const iva = subtotal * 0.21
    const total = Math.round(subtotal + iva)

    // 4. Crear movimiento tipo ENTRADA
    const movimiento = await prisma.movimiento.create({
      data: {
        tipo: "ENTRADA",
        cantidad: total,
        maestroId: maestro.id,
        responsableId,
      },
    })

    res.status(200).json({ ok: true, movimientoId: movimiento.id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error al registrar la compra" })
  }
}

