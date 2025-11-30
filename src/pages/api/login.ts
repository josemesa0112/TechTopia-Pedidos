import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña requeridos" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  res.status(200).json({
    message: "Login exitoso",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
}
