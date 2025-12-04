TechTopia - Pedidos

Sistema de gestión de compras y pedidos para la plataforma TechTopia. Este proyecto permite a los usuarios explorar productos, agregar al carrito, realizar pagos simulados y visualizar la confirmación del pedido. Además, incluye paneles administrativos para gestionar usuarios, maestros y transacciones.

🚀 Despliegue

URL del proyecto:https://nombreEquipo-Pedidos.vercel.app

Integrantes del equipo

Jose David Mesa Roldan 1044986033

Usuarios de prueba

Administrador
Correo: admin@techtopia.com
Contraseña: admin123

Usuario
Correo: usuario@techtopia.com
Contraseña: usuario123

Funcionalidades principales

Catálogo de productos

Filtros por categoría, stock y precio

Ordenamiento por relevancia, precio y rating

Agregar productos al carrito

Carrito de compras

Visualización persistente con localStorage

Botón flotante para acceso rápido

Checkout

Formulario con validación de datos personales y tarjeta

Simulación de pago y confirmación

Registro del movimiento en base de datos

Confirmación de pedido

Página con resumen del pedido, dirección de envío y totales

Botones para imprimir, seguir comprando o volver al inicio

Panel administrativo

Gestión de usuarios, maestros y transacciones

Visualización de saldos y movimientos

Acceso condicional según rol (ADMIN / USER)

Tecnologías utilizadas

Next.js (frontend y backend)

Prisma (ORM para base de datos)

Railway (base de datos PostgreSQL)

Tailwind CSS (estilos)

Vercel (despliegue)

⚙️ Cómo ejecutar el proyecto

Clonar el repositorio:

git clone https://github.com/josemesa0112/TechTopia-Pedidos.git

Instalar dependencias:

npm install

Configurar variables de entorno:

DATABASE_URL="postgresql://postgres:XTyUZcChXOBUflllakcSQyRUHGVVVqzX@shinkansen.proxy.rlwy.net:30172/railway"

Ejecutar migraciones:

npx prisma migrate dev --name init

Iniciar el servidor:

npm run dev

Documentación interna

El código incluye comentarios explicativos en:

CheckoutForm.jsx: lógica de envío y redirección

confirmacion.tsx: renderizado condicional y lectura de datos

api/checkout.js: inserción de movimiento en la base de datos

utils/cart.js: persistencia del carrito

