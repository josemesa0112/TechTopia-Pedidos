import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, name, role } = req.body;

  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
      role: role ?? "USER",
    },
  });

  res.status(201).json({ user });
}
