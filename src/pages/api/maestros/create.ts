import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nombre, creadorId } = req.body;

  const maestro = await prisma.maestro.create({
    data: {
      nombre,
      creadorId,
    },
  });

  res.status(201).json({ maestro });
}
