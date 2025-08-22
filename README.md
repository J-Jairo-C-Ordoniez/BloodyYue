# BloodyYue (Next.js + MySQL Starter)

Proyecto base para **frontend + API** usando **Next.js** y **MySQL** en JavaScript.
Arquitectura inspirada en **MVC** (models en `/models`, control en API) con UI escalable (Atomic Design si lo necesitas).

## 📦 Tech
- Next.js (pages router)
- React
- MySQL (mysql2/promise)

## 🗂 Arquitectura
```
bloodyyue/
├── public/                     # Recursos públicos: imágenes, íconos, etc.
│
├── styles/                    # CSS global y configuración de Tailwind
│   └── globals.css
│
├── components/                # Atomic Design
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│
├── pages/                     # Vistas del frontend (Next.js)
│   ├── index.js               # Página principal
│   ├── _app.js
│   └── api/                   # API Routes = controladores REST accesibles por frontend
│       ├── auth/
│       │   ├── login.js
│       │   ├── register.js
│       │   └── me.js
│       ├── posts/
│       │   └── create.js
│       ├── commissions/
│       │   ├── create.js
│       │   └── [id].js
│       └── reactions/
│           └── [post_id].js
│
├── controllers/               # Lógica de negocio
│
├── models/                    # Acceso a la base de datos
|
├── config/                    # Configuración
│   ├── db.js                  # Conexión a MySQL
│   ├── jwt.js                 # Secret + funciones JWT
│   └── index.js               # Configs globales opcionales
│
├── lib/                       # Utilidades, helpers, middlewares
│   ├── middleware.js          # Autenticación JWT
│   └── validators.js          # Validación de inputs (opcional)
│
├── hooks/                     # Custom hooks (opcional)
|
│
├── context/                   # Estado global con Context API (opcional)
│   └── AuthContext.js
│
├── .env                       # Variables de entorno
├── next.config.js
├── tailwind.config.js
└── README.md

```

## 🚀 Empezar

1. Clona y entra:
```bash
npm install
cp .env.example .env.local   # Edita credenciales
npm run dev
```

2. Crea la base de datos y tabla (ejemplo):
```sql
CREATE DATABASE IF NOT EXISTS bloodyyue;
USE bloodyyue;

CREATE TABLE IF NOT EXISTS commissions (
  commission_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  type VARCHAR(100),
  details TEXT,
  url_example VARCHAR(255),
  price FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

3. Prueba la API:
- GET http://localhost:3000/api/commissions
- POST http://localhost:3000/api/commissions

Body JSON de ejemplo:
```json
{
  "title": "Retrato Digital",
  "type": "Ilustración",
  "details": "Estilo BloodyYue",
  "url_example": "https://...",
  "price": 120
}
```

## ⚙️ Configuración MySQL
Edita `.env.local`:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=bloodyyue
DB_PORT=3306
```

## 🧩 Notas
- Puedes mover más lógica a `/models` y crear más endpoints en `/pages/api/...`.
- Si luego agregas Tailwind, importa en `pages/_app.js`.
- Para producción usa `npm run build` y `npm start`.
