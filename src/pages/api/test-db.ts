import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, role: true }
    })
    res.status(200).json(users)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}