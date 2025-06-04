[Frontend] ➝ Next.js + TypeScript
[Backend] ➝ Node.js + Express + Prisma ORM
[Base de Datos] ➝ PostgreSQL
[Autenticación] ➝ JWT (stateless)
[ORM] ➝ Prisma (acceso estructurado a la DB)
[Infraestructura] ➝ Vercel (frontend), Railway o Render (backend + DB)



📦 freelance-os/
├── frontend/               → Aplicación Next.js (cliente)
│   ├── components/         → Componentes reutilizables
│   ├── pages/              → Rutas
│   ├── services/           → Funciones que llaman al backend
│   ├── styles/             → Estilos globales o Tailwind
│   └── utils/              → Funciones helper
│
├── backend/                → API con Node + Express
│   ├── src/
│   │   ├── controllers/    → Lógica de cada ruta
│   │   ├── routes/         → Endpoints (Express)
│   │   ├── middlewares/    → Validaciones, auth
│   │   ├── prisma/         → Esquema y conexión a DB
│   │   ├── services/       → Lógica de negocio
│   │   └── index.ts        → Main del backend
│
├── docs/                   → Documentación del proyecto
├── .env                    → Variables de entorno
├── README.md
└── package.json


# Arquitectura de Software – Freelance OS

## Tecnologías principales

- **Frontend:** Next.js con TypeScript y TailwindCSS
- **Backend:** Node.js con Express y Prisma
- **Base de datos:** PostgreSQL
- **ORM:** Prisma
- **Autenticación:** JWT
- **Infraestructura:** Vercel (frontend) + Railway o Render (backend + DB)

---

## Estructura general del repositorio

Separamos el frontend y el backend en carpetas distintas, dentro del mismo repositorio mono-repo.

---

## Comunicación Frontend ↔ Backend

- El frontend usará `fetch` o Axios para comunicarse con la API REST creada en el backend.
- La autenticación será por medio de tokens JWT guardados en cookies seguras o localStorage.

---

## ¿Por qué esta arquitectura?

- Es fácil de escalar.
- Usa tecnologías muy buscadas en el mercado.
- Permite aprendizaje completo de desarrollo full stack moderno.
- Se adapta a integrar IA en el futuro.

---
