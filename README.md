# 🎨 BloodyYue

Sistema web profesional desarrollado para la artista digital **BloodyYue**, enfocado en potenciar su presencia online, mejorar su portafolio artístico y facilitar la comunicación y gestión de comisiones con sus clientes.

---

## 📌 Descripción del Proyecto

**BloodyYue** es una plataforma web personalizable que permite a la artista:

- Gestionar su perfil artístico.
- Publicar y compartir sus obras.
- Ofrecer comisiones detalladas.
- Recibir compras, gestionar ventas y respuestas de clientes.
- Conectar redes sociales y mostrar ejemplos de su trabajo.

---

## 🚀 Tecnologías Utilizadas
- **Node.js** con **NextJS**
- **JWT** para autenticación segura
- **MySQL** como base de datos relacional
- **Tailwind CSS** para estilos responsivos

---

## 📁 Estructura de Carpetas (propuesta)
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
│   ├── templates/
│   └── layout/
│
├── pages/                     # Vistas del frontend (Next.js)
│   ├── index.jsx              # Página principal
│   ├── login.jsx
│   ├── dashboard.jsx
│   ├── commissions/
│   │   ├── create.jsx
│   │   └── [id].jsx
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
│   ├── authController.js
│   ├── postController.js
│   ├── commissionController.js
│   └── userController.js
│
├── models/                    # Acceso a la base de datos
│   ├── UserModel.js
│   ├── PostModel.js
│   ├── CommissionModel.js
│   └── DB.js                  # Opcional: exporta todas las conexiones
│
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
│   └── useAuth.js
│
├── context/


---

## 🧩 Base de Datos

La base de datos está diseñada con un enfoque relacional y escalable. Incluye tablas como:

- `users`, `roles`, `social_links`
- `posts`, `type_post`, `labels`, `labels_x_post`
- `commissions`, `sales`, `details_sale`, `payment_methods`
- `reactions_x_post`, `response_client`

📌 Para ver el modelo completo, revisa el archivo [`/docs/database-diagram.png`]

## 🧩 Modelo de Datos 
### users

| Campo                | Tipo              | Descripción                |
|----------------------|-------------------|----------------------------|
| user_id              | primary key       | Identificador único        |
| name                 | varchar(50)       | Nombre del usuario         |
| email                | varchar(50)       | Correo electrónico         |
| password             | varchar(255)      | Contraseña                 |
| avatar               | varchar(255)      | URL del avatar             |
| url_terms_conditions | varchar(255)      | URL de términos y condiciones |
| pitch_video          | varchar(255)      | URL de video de presentación |
| biography            | text              | Biografía                  |
| details              | text              | Detalles adicionales       |
| rol_id               | int unsigned      | Rol asociado               |
| pais                 | varchar(255)      | País                       |
| created_at           | timestamp         | Fecha de creación          |
| updated_at           | timestamp         | Fecha de actualización     |

### roles

| Campo        | Tipo         | Descripción            |
|--------------|--------------|------------------------|
| rol_id       | primary key  | Identificador único    |
| title        | varchar(50)  | Título del rol         |
| description  | text         | Descripción            |
| permissions  | JSON (TEXT)  | Permisos asociados     |
| created_at   | timestamp    | Fecha de creación      |
| updated_at   | timestamp    | Fecha de actualización |

### social_links

| Campo            | Tipo         | Descripción            |
|------------------|--------------|------------------------|
| social_links_id  | primary key  | Identificador único    |
| title            | varchar(50)  | Nombre de la red social|
| url_social       | varchar(255) | URL de la red social   |
| created_at       | timestamp    | Fecha de creación      |
| updated_at       | timestamp    | Fecha de actualización |

### social_x_user

| Campo            | Tipo         | Descripción            |
|------------------|--------------|------------------------|
| sxu_id           | primary key  | Identificador único    |
| user_id          | int unsigned | Usuario asociado       |
| social_links_id  | int unsigned | Red social asociada    |
| created_at       | timestamp    | Fecha de creación      |
| updated_at       | timestamp    | Fecha de actualización |

### posts

| Campo        | Tipo           | Descripción            |
|--------------|----------------|------------------------|
| post_id      | primary key    | Identificador único    |
| user_id      | int unsigned   | Autor                  |
| title        | varchar(100)   | Título                 |
| description  | text           | Descripción            |
| url_content  | varchar(255)   | URL del contenido      |
| type         | int unsigned   | Tipo de publicación    |
| created_at   | timestamp      | Fecha de creación      |
| updated_at   | timestamp      | Fecha de actualización |

### type_post

| Campo         | Tipo         | Descripción            |
|---------------|--------------|------------------------|
| type_post_id  | primary key  | Identificador único    |
| title         | varchar(50)  | Título                 |
| description   | text         | Descripción            |
| created_at    | timestamp    | Fecha de creación      |
| updated_at    | timestamp    | Fecha de actualización |

### labels

| Campo      | Tipo         | Descripción            |
|------------|--------------|------------------------|
| label_id   | primary key  | Identificador único    |
| title      | varchar(50)  | Título                 |
| description| text         | Descripción            |
| created_at | timestamp    | Fecha de creación      |
| updated_at | timestamp    | Fecha de actualización |

### labels_x_post

| Campo     | Tipo         | Descripción            |
|-----------|--------------|------------------------|
| lxp_id    | primary key  | Identificador único    |
| post_id   | int unsigned | Publicación asociada   |
| label_id  | int unsigned | Etiqueta asociada      |
| created_at| timestamp    | Fecha de creación      |
| updated_at| timestamp    | Fecha de actualización |

### commissions

| Campo        | Tipo           | Descripción            |
|--------------|----------------|------------------------|
| commission_id| primary key    | Identificador único    |
| title        | varchar(100)   | Título                 |
| type         | varchar(100)   | Tipo de comisión       |
| details      | text           | Detalles               |
| url_example  | varchar(255)   | URL de ejemplo         |
| price        | float          | Precio                 |
| created_at   | timestamp      | Fecha de creación      |
| updated_at   | timestamp      | Fecha de actualización |

### sales

| Campo        | Tipo         | Descripción            |
|--------------|--------------|------------------------|
| sale_id      | primary key  | Identificador único    |
| user_id      | int unsigned | Usuario vendedor       |
| cliente_id   | int          | Cliente                |
| comission_id | int          | Comisión asociada      |
| created_at   | timestamp    | Fecha de creación      |
| updated_at   | timestamp    | Fecha de actualización |

### reactions_x_post

| Campo     | Tipo         | Descripción            |
|-----------|--------------|------------------------|
| rxp_id    | primary key  | Identificador único    |
| post_id   | int unsigned | Publicación asociada   |
| amount    | int          | Cantidad de reacciones |
| created_at| timestamp    | Fecha de creación      |
| updated_at| timestamp    | Fecha de actualización |

### details_sale

| Campo           | Tipo         | Descripción            |
|-----------------|--------------|------------------------|
| details_sale_id | primary key  | Identificador único    |
| sale_id         | int          | Venta asociada         |
| amount          | int          | Cantidad               |
| total           | float        | Total                  |
| is_completed    | boolean      | ¿Completada?           |
| payment_method  | int          | Método de pago         |
| created_at      | timestamp    | Fecha de creación      |
| updated_at      | timestamp    | Fecha de actualización |

### payment_methods

| Campo             | Tipo         | Descripción            |
|-------------------|--------------|------------------------|
| payment_method_id | primary key  | Identificador único    |
| title             | varchar(50)  | Título                 |
| description       | text         | Descripción            |
| created_at        | timestamp    | Fecha de creación      |
| updated_at        | timestamp    | Fecha de actualización |

### response_client

| Campo               | Tipo         | Descripción            |
|---------------------|--------------|------------------------|
| response_client_id  | primary key  | Identificador único    |
| user_id             | int unsigned | Usuario asociado       |
| comission_id        | int          | Comisión asociada      |
| menssage            | text         | Mensaje                |
| is_viewed_by_client | boolean      | ¿Visto por el cliente? |
| created_at          | timestamp    | Fecha de creación      |
| updated_at          | timestamp    | Fecha de actualización |

---

## ✅ Funcionalidades Principales

- Registro e inicio de sesión con JWT
- Gestión de perfil y redes sociales
- Publicación de obras (posts con etiquetas y multimedia)
- Sistema de comisiones artísticas
- Gestión de ventas y respuestas a clientes
- Reacciones públicas a publicaciones

🤝 Contribuciones
Este proyecto fue desarrollado por [Jhon Córdoba] para la artista digital BloodyYue como parte de un portafolio y proyecto de grado. ¡Toda colaboración futura es bienvenida!

📬 Contacto
Si deseas contactar al desarrollador o a la artista, puedes escribir a:

💻 Jhon Córdoba: GitHub | Email: tuemail@example.com

🎨 BloodyYue: Redes sociales visibles en la plataforma.
