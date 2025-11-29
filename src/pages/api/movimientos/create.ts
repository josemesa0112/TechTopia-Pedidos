import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { maestroId, tipo, cantidad, responsableId } = req.body;

  const movimiento = await prisma.movimiento.create({
    data: {
      maestroId,
      tipo,
      cantidad,
      responsableId,
    },
  });

  // actualizar el saldo del maestro automáticamente
  await prisma.maestro.update({
    where: { id: maestroId },
    data: {
      saldo: tipo === "ENTRADA"
        ? { increment: cantidad }
        : { decrement: cantidad },
    },
  });

  res.status(201).json({ movimiento });
}
