# Car Wash Booking System Assignment 3 ( Car Washing shop Application API ) -

This is a Node.js application built with Express.js, MongoDB (using Mongoose), and TypeScript.

![Mongoose Model Diagram](https://i.ibb.co/D7Kpf4W/Screenshot-2024-06-15-163923.png)

<h1 align="center">
  Car Was Booking diagram 🚀
</h1>
<p align="center">
  (Assignment-3)
</p>

## Project Overview

The Car Wash Booking System is designed to streamline the process of booking car wash services. It provides users with an easy way to book services, view available slots, and manage their bookings. The system also allows administrators to manage services, slots, and view all bookings.

### Features

- User authentication and authorization
- Role-based access control (admin and user)
- Booking creation, retrieval, and management
- Service and slot management
- Real-time slot availability check
- Secure password hashing

## Live URL

You can access the live version of the application [here](https://car-wash-booking-service.vercel.app).

## Projects model

### User Model

- `name`: Full name of the user.
- `email`: Email address used for communication and login.
- `password`: Securely hashed password for authentication.
- `phone`: Contact phone number for notifications and updates.
- `role`**:** The role of the user, which can be one of the following: `admin`, `user`.
- `address`: Complete physical address for service delivery or correspondence.

### Service Model

- `name`: Title of the service.
- `description`: Brief description of what the service entails.
- `price`: Cost of the service in the local currency.
- `duration`**:** Duration of the service in minutes.
- `isDeleted`: Indicates whether the service is marked as deleted (false means it is not deleted).

### Slot Model

- `service`: Reference to the specific service being booked.
- `date`: Date of the booking.
- `startTime`: Start time of the slot.
- `endTime`: Approximate end time of the slot.
- `isBooked`: Status of the slot (available, booked, canceled).

### Booking Model

- `customer`: Reference to the user who made the booking.
- `service`: Reference to the booked service.
- `slot`: Reference to the booking slot.
- `vehicleType`: Type of the vehicle (enum: `car`, `truck`, `SUV`, `van`, `motorcycle`, `bus`, `electricVehicle`, `hybridVehicle`, `bicycle`, `tractor`).
- `vehicleBrand`: Brand or manufacturer of the vehicle.
- `vehicleModel`: Model or variant of the vehicle.
- `manufacturingYear`: Manufacturing year of the vehicle.
- `registrationPlate`: Unique registration number assigned to the vehicle.

## 🔗 Objective

The goal of this assignment is to build a fully functional web application by integrating a frontend with the backend system created in Assignment 3. This involves:

- **Connecting your frontend** to the existing backend APIs.
- **Implementing user and admin dashboards** with real-time data.
- **Ensuring smooth interaction** and data flow between the frontend and backend systems.
- **Applying UI/UX principles** to create a user-friendly interface.

## API Endpoints

### Auth API

- **POST /auth/signup**: Create a new user account.
- **POST /auth/login**: Authenticate and log in a user.
- **POST /auth/change-password**: Change the password of an authenticated user.
- **POST /auth/refresh-token**: Refresh the authentication token.

### User API

- **GET /auth/users**: Retrieve a list of all users (admin only).
- **GET /auth/admins**: Retrieve a list of all admins (admin only).
- **GET /auth/:email**: Retrieve details of a specific user (admin and user).
- **PATCH /auth/:id**: Update user account details (admin and user).

### Service API

- **POST /services**: Create a new car wash service (admin only).
- **GET /services/:id**: Retrieve details of a specific service.
- **GET /services**: Retrieve a list of all available services.
- **PUT /services/:id**: Update details of a specific service (admin only).
- **DELETE /services/:id**: Delete a specific service (admin only).

### Slot API

- **POST /slots**: Create a new service slot (admin only).
- **GET /slots/:id**: Retrieve details of a specific service slot.
- **GET /slots/availability**: Check availability of all service slots.
- **GET /slots**: Retrieve a list of all service slots (admin only).
- **PATCH /slots/:id**: Update the status of a specific service slot (admin only).

### Booking API

- **POST /bookings**: Create a new service slot booking (user only).
- **GET /bookings**: Retrieve a list of all service slot bookings (admin only).
- **GET /my-bookings**: Retrieve a list of bookings made by the authenticated user.

### Payment API

- **POST /payment/conformation**: Confirm payment for a booking.

### Website Review API

- **POST /website-reviews/create-website-review**: Create a new review (user only).
- **GET /website-reviews**: Retrieve a list of all reviews.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Md-Rijwan-Jannat/Car-Wash-Booking-System-Backend--API.git
   ```

2. Navigate into the project directory:

   ```bash
   cd Car-Wash-Booking-System-Backend--API
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

## Usage

### Development Mode

To run the application in development mode:

```bash
yarn start:dev
```

This will start the server using `ts-node-dev`, which enables live reloading on code changes.

# Example .env file

NODE_ENV=development

# Application Port

PORT=5000

# Frontend URLs

FRONTEND_BASE_URL=http://localhost:5173
FRONTEND_LIVE_URL=https://car-wash-pearl.vercel.app

# Backend URL

BACKEND_LIVE_URL=https://car-wash-booking-service.vercel.app

# Database Connection String

DATABASE_URL=your_mongodb_connection_string

# Security & Authentication

BCRYPT_ROUNDS_SALT=10
JWT_ACCESS_TOKEN=your_jwt_access_token_secret
JWT_REFRESH_TOKEN=your_jwt_refresh_token_secret
JWT_ACCESS_TOKEN_EXPIRE_IN=365d
JWT_REFRESH_TOKEN_EXPIRE_IN=365d

# Payment Gateway (Aamarpay) Credentials

STORE_ID=your_aamarpay_store_id
SIGNATURE_KEY=your_signature_key
AAMARPAY_URL=https://sandbox.aamarpay.com/jsonpost.php
PAYMENT_VERIFY_URL=https://sandbox.aamarpay.com/api/v1/trxcheck/request.php

### Production Mode

To build and run the application in production mode:

1. Build the TypeScript files:

   ```bash
   yarn build
   ```

2. Start the server:
   ```bash
   yarn start:prod
   ```

### Linting and Formatting

To lint the TypeScript files:

```bash
yarn lint
```

To automatically fix linting issues:

```bash
yarn lint:fix
```

To format the TypeScript files using Prettier:

```bash
yarn prettier:format
```

### Testing

This project doesn't have tests set up yet. You can add your own testing framework and write tests accordingly.

### Configuration

This project uses dotenv for environment variable configuration. Create a `.env` file in the root directory and add your environment variables there.`

## Dependencies

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) with various options.
- **Dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **Zod**: TypeScript-first schema declaration and validation library.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Eslint**: Pluggable JavaScript linter.
- **Prettier**: Opinionated code formatter.

### Good Luck!
