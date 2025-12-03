export default function handler(req, res) {
  const { email, password } = req.body

  if (
    (email === "admin@ejemplo.com" && password === "admin123") ||
    (email === "cliente@ejemplo.com" && password === "cliente123")
  ) {
    return res.status(200).json({
      user: {
        name: email.includes("admin") ? "Administrador" : "Cliente",
        email,
        role: email.includes("admin") ? "ADMIN" : "USER",
      },
    })
  }

  return res.status(401).json({ error: "Credenciales inválidas" })
}


