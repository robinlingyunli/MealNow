# MealNow

A full-stack multi-restaurant food ordering platform — built end to end with React, Spring Boot, and MySQL. Customers browse restaurants by cuisine, order from per-restaurant menus, and track orders, while restaurant owners run their own storefront: menu, categories, ingredients, promotions, and events.

## Features

- **Auth** — signup/login for customers and restaurant owners, JWT-based sessions, role-based access (`ROLE_CUSTOMER`, `ROLE_RESTAURANT_OWNER`, `ROLE_RESTAURANT_MANAGER`, `ROLE_ADMIN`)
- **Restaurant discovery** — browse by cuisine, search, favorites
- **Menus & ordering** — per-restaurant menu with categories and ingredients, cart, checkout, order history
- **Reviews & ratings** — per-restaurant reviews with average rating
- **Promotions & events** — restaurant-run discount campaigns and events, featured on the homepage
- **Restaurant owner dashboard** — create/manage a restaurant, menu items, categories, ingredients, promotions, and events
- **Address book** — save and manage delivery addresses
- Responsive UI with Tailwind CSS + MUI

## Tech Stack

**Frontend** — React 18 (Create React App), Redux + Redux Thunk, React Router v6, Tailwind CSS, MUI v5, Axios, Formik + Yup, react-slick

**Backend** — Spring Boot 3.5 (Java 17), Spring Security + JWT (`io.jsonwebtoken`), Spring Data JPA / Hibernate

**Database** — MySQL

**Payments** — Stripe SDK

## Project Structure

```
Online-Food-Ordering/
├── backup.sql                     # Sample data dump for the `online_food` database
├── backend/
│   ├── src/main/java/com/example/
│   │   ├── controller/             # REST controllers (auth, restaurants, food, cart, order, reviews, promotions, events, admin/*)
│   │   ├── model/                  # JPA entities (User, Restaurant, Food, Order, Cart, Promotion, Event, Review, ...)
│   │   ├── repository/             # Spring Data repositories
│   │   ├── service/                # Business logic (+ *Implementation classes)
│   │   ├── request/, response/     # Inbound/outbound DTOs
│   │   ├── config/                 # Spring Security & JWT config
│   │   ├── domain/                 # Enums (USER_ROLE, ...)
│   │   └── dto/                    # Shared DTOs
│   └── src/main/resources/application.properties
└── frontend/
    └── src/
        ├── customers/              # Customer-facing pages & components (Home, Restaurant, Cart, Orders, Profile, Auth)
        ├── Admin/                  # Restaurant-owner dashboard (menu, orders, promotions, events, ingredients)
        ├── SuperAdmin/             # Platform-admin console
        ├── State/                  # Redux store (auth, restaurant, menu, cart, order, review, promotion, ...)
        ├── Routers/                # Route definitions
        ├── constants/              # Shared layout constants
        └── config/                 # Axios instance / API base URL
```

## Getting Started

**Prerequisites:** Node.js 18+, Java 17, MySQL 8+ running locally

### 1. Database

Create a MySQL database named `online_food`. The schema is created/updated automatically on backend startup (`spring.jpa.hibernate.ddl-auto=update`), so no manual migration step is required.

```
mysql -u root -p -e "CREATE DATABASE online_food"
```

Optionally, import `backup.sql` for sample data:

```
mysql -u root -p online_food < backup.sql
```

### 2. Backend

```
cd backend
```

Create `backend/.env` (gitignored) with at least your MySQL password:

```
DATABASE_PASSWORD=your_mysql_password
```

Then run:

```
./mvnw spring-boot:run       # macOS/Linux
mvnw.cmd spring-boot:run     # Windows
```

Backend runs at `http://localhost:5454`.

### 3. Frontend

```
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`.

## Environment Variables

**`backend/.env`:**

| Variable | Description |
|---|---|
| `DATABASE_URL` | Optional. JDBC connection string, defaults to `jdbc:mysql://localhost:3306/online_food` |
| `DATABASE_USERNAME` | Optional, defaults to `root` |
| `DATABASE_PASSWORD` | Required. Your MySQL password |
| `JWT_SECRET_KEY` | Optional. Secret used to sign auth tokens — falls back to a built-in dev secret; set your own for anything beyond local dev |
| `STRIPE_API_KEY` | Required only if exercising Stripe-backed payment code paths |
| `PORT` | Optional, defaults to `5454` |

**`frontend/.env`** (optional — Create React App requires the `REACT_APP_` prefix):

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Backend base URL, defaults to `http://localhost:5454` |
