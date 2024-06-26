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

This project uses dotenv for environment variable configuration. Create a `.env` file in the root directory and add your environment variables there.

Example `.env` file:

```plaintext
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://Car-Wash-Booking-System:ji3rYNY80xbYyAdY@cluster0.gejjs5n.mongodb.net/Car-Wash-Booking-System?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_ROUNDS_SALT=10
JWT_ACCESS_TOKEN=40a3e1685ebf3538764b08b7468d299688ff7b6e92f32a7aff06218b05dc13c
JWT_REFRESH_TOKEN=8be70f366b4c06836a76ba02c7c99a91a1f69194c5cb70e075585b54913410db79205a279f485306cca9fd6c0a858f467dd85cddf34dee138e4aaac568e9a873
JWT_ACCESS_TOKEN_EXPIRE_IN=10d
JWT_REFRESH_TOKEN_EXPIRE_IN=365d

```

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
