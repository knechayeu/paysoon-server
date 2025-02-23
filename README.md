# Application Documentation

## Installation

1. Install the required dependencies:

```bash
npm install
```

## Configuration

Create a configuration file `.env` in the root of your project with the following parameters:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydatabase
DB_USER=myuser
DB_PASSWORD=mypassword
DB_SSL=false
```

## Database Migrations

We use `db-migrate-pg` for database migrations management.

### Creating a Migration

To create a new migration:

```bash
npm run migration:create <migration_name>
```

Example:
```bash
npm run migration:create create_users_table
```

### Writing Migrations

Migration files are located in the `migrations` directory. Each migration has `up` and `down` methods:

```javascript
exports.up = function(db) {
  // Code to apply migration
};

exports.down = function(db) {
  // Code to rollback migration
};
```

### Managing Migrations

- Apply all pending migrations:
```bash
npm run migration:up
```

- Rollback last migration:
```bash
npm run migration:down
```

- Check migrations status:
```bash
npm run migration:status
```

## API Documentation

### Authentication

#### Login
- **POST** `/api/auth/login`
- Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Register
- **POST** `/api/auth/register`
- Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Users

#### Get User Profile
- **GET** `/api/users/profile`
- Headers: `Authorization: Bearer <token>`

#### Update User Profile
- **PUT** `/api/users/profile`
- Headers: `Authorization: Bearer <token>`
- Body:
```json
{
  "name": "New Name",
  "email": "new.email@example.com"
}
```

## Error Handling

The application uses standardized error responses:

```json
{
  "status": "error",
  "code": "ERROR_CODE",
  "message": "Error description"
}
```

Common error codes:
- `UNAUTHORIZED`: Authentication required
- `INVALID_INPUT`: Invalid request parameters
- `NOT_FOUND`: Requested resource not found
- `SERVER_ERROR`: Internal server error

## Development

### Running the Application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --grep "Auth"
```

### Code Style

We use ESLint and Prettier for code formatting. Run linting:

```bash
npm run lint
```

Fix formatting issues:
```bash
npm run lint:fix
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Set up environment variables on your server

3. Start the application:
```bash
npm start
```

## Support

For technical support or questions, please contact:
- Email: support@example.com
- Issue Tracker: https://github.com/your-repo/issues

---

This documentation provides comprehensive information about installation, configuration, and usage of the application.