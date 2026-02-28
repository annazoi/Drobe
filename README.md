# Drobe

Drobe is a modern web application built with a robust NestJS backend and a dynamic React frontend. It allows users to create a digital version of their wardrobe by uploading photos of their clothes, mixing and matching items on a canvas to create stylish outfits, and sharing them with a community.

## Features

- **Digital Wardrobe:** Upload and manage photos of your clothing items to build an online wardrobe.
- **Outfit Creator:** Combine different clothing pieces on a flexible canvas to visualize and plan outfits.
- **Community Sharing:** Share your favorite outfits with other users to inspire and get inspired.
- **Social Engagement:** Like, comment, and engage with outfits shared by others in the community.
- **Background Removal:** Seamless background removal for uploaded clothing items.
- **Cross-Platform Readiness:** Leverages Capacitor for potential mobile application deployment.

## Tech Stack

### Frontend Architecture (`/app`)

- **Framework:** React 18, TypeScript, Vite
- **UI & Styling:** Chakra UI, Framer Motion
- **State Management:** Zustand, React Query
- **Canvas/Image Manipulation:** Fabric.js, @imgly/background-removal
- **Routing:** React Router DOM
- **Forms & Validation:** Yup, React Hook Form

### Backend Architecture (`/api`)

- **Framework:** NestJS, TypeScript
- **Database:** MongoDB
- **Validation:** Zod, Class-Validator
- **Authentication:** JWT (JSON Web Tokens)

## Project Structure

The project is strictly organized to maintain scalability and clarity:

- **`app/`**: Contains the React + TypeScript frontend application. Structured by features and domains, with a strict separation of components, hooks, services, and store logic.
- **`api/`**: Contains the NestJS backend application. Follows SOLID principles with a clear separation of thin controllers and robust services, using DTOs and Zod validation.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/annazoi/Drobe.git
cd Drobe
```

### 2. Frontend Setup (Client)

Navigate to the frontend directory:

```bash
cd app
```

Install dependencies:

```bash
npm install
```

Set up the environment variables. Create a `.env` file in the `app` directory:

```env
VITE_API_URL=your_api_url
```

Run the development server:

```bash
npm run dev
```

### 3. Backend Setup (Server)

Navigate to the backend directory:

```bash
cd ../api
```

Install the backend dependencies:

```bash
npm install
```

Set up the environment variables. Create a `.env` file in the `api` directory:

```env
DB_CONNECTION=your_db_connection
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_KEY_SECRET=your_key_secret
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION_TIME=your_jwt_expiration_time
UPLOAD_RATE_TTL=your_upload_rate_ttl
UPLOAD_RATE_LIMIT=your_upload_rate_limit
```

Run the backend server:

```bash
npm run start:dev
```

## Engineering Standards

This repository adheres to strict software engineering standards to ensure high maintainability:

- **Strict TypeScript:** No `any` types. Full use of utility and strict types.
- **Component Design:** Functional components, hooks for logic separation, and immutable state updates.
- **Backend Clean Architecture:** Controllers remain thin (routing/validation only), with all core business logic residing in stateless, deterministic services.
- **Validation-First:** All API payloads and query parameters are strictly validated using DTOs and Zod.
