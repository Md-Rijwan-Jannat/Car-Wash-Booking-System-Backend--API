# Car Wash Booking System Assignment 3 ( Car Washing shop Application API ) -

This is a Node.js application built with Express.js, MongoDB (using Mongoose), and TypeScript.

## Installation

1. Deploy link:

   ```bash
   Live Link https://car-wash-booking-system.vercel.app
   ```

2. Clone the repository:

   ```bash
   git clone https://github.com/Md-Rijwan-Jannat/Car-Wash-Booking-System-Backend--API.git
   ```

3. Navigate into the project directory:

   ```bash
   cd Car-Wash-Booking-System-Backend--API
   ```

4. Install dependencies:
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
yarn prettier
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
