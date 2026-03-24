# 📘 SezinApp

SezinApp is a full-stack web application developed as part of a summer internship project. It consists of a frontend built with React and a backend developed using Kotlin + Spring Boot. The application demonstrates authentication, user management, custom domain routing, and deployment strategies using Docker and PostgreSQL.

---

## 📑 Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Custom Domain Setup](#custom-domain-setup)
- [Frontend Routing Logic](#frontend-routing-logic-controller-structure)
- [Usage](#usage)

---

## 🛠️ About the Project

This project consists of the following main components:

- 🎯 **Backend**: RESTful services developed using Kotlin + Spring Boot
- 🛢️ **Database**: PostgreSQL managed with Docker
- 🔁 **Database Migration**: Managed via Flyway for automatic schema creation
- 💻 **Frontend**: React-based application placed inside the backend’s `static` directory
- 🌐 **Custom Domain**: Allows each frontend to be served under a unique domain such as `sezinapp.com`

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure the following tools are installed:

- [Docker](https://www.docker.com/)
- JDK 17+
- Gradle (or use `./gradlew` provided in the project)
- Node.js and npm (for building the frontend)

### ⚙️ Installation

#### 1. Start Docker Services

```bash
docker-compose up -d
```

This step starts the PostgreSQL container and runs Flyway to initialize the database.

#### 2. Start Backend Application

```bash
./gradlew bootRun
```

When the backend is successfully running, it will serve frontend apps based on their domain.

#### 3. Build and Place Frontend

Navigate to your frontend directory and run:

```bash
npm run build
```

Copy the generated `dist` folder into the backend project’s `src/main/resources/static/` directory with the appropriate subfolder name:

```
src/
└── main/
    └── resources/
        └── static/
            ├── admin-frontend/
            ├── user-frontend/
            ├── melike-frontend/
            ├── ceren-frontend/
            └── sezin-frontend/
```

For example, the domain `sezinapp.com` should serve content from the `sezin-frontend` folder.

---

## 🌍 Custom Domain Setup

### 🖥️ Hosts File Configuration (Windows)

Add the following lines to your `C:\Windows\System32\drivers\etc\hosts` file:

```
127.0.0.1   adminapp.com
127.0.0.1   userapp.com
127.0.0.1   melikeapp.com
127.0.0.1   cerenapp.com
127.0.0.1   sezinapp.com
```

These mappings allow local development for each domain.

---

## 🔁 Frontend Routing Logic (Controller Structure)

The backend dynamically resolves which frontend to serve based on the request’s domain:

```kotlin
@Controller
class FrontendController {

    private fun resolveBasePath(request: HttpServletRequest): String {
        val host = request.getHeader("Host") ?: request.serverName
        return when (host) {
            "www.adminapp.com" -> "admin-frontend"
            "www.userapp.com" -> "user-frontend"
            "www.melikeapp.com" -> "melike-frontend"
            "www.cerenapp.com" -> "ceren-frontend"
            "www.sezinapp.com" -> "sezin-frontend"
            else -> "default"
        }
    }

    @GetMapping("/{path:^(?!api).*}")
    fun serveFrontend(@PathVariable path: String, request: HttpServletRequest): String {
        val folder = resolveBasePath(request)
        return "forward:/$folder/index.html"
    }
}
```

This makes `https://www.sezinapp.com` automatically serve the correct React app.

---

## 🧪 Usage

### 🔗 Available Endpoints

| Method | Endpoint        | Description         |
|--------|------------------|---------------------|
| POST   | `/api/login`     | Login functionality |
| GET    | `/api/users`     | List all users      |
| POST   | `/api/users`     | Add a new user      |

Frontend apps access these endpoints via `axios` or `fetch`.

### 🌐 CORS Configuration

```kotlin
@Bean
fun corsConfigurer(): WebMvcConfigurer {
    return object : WebMvcConfigurer {
        override fun addCorsMappings(registry: CorsRegistry) {
            registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:3000",
                    "https://www.adminapp.com",
                    "https://www.userapp.com"
                )
                .allowedMethods("*")
        }
    }
}
```
