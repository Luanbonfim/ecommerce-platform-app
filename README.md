# Angular E-Commerce Platform

Welcome to **My Angular E-Commerce Platform**! This is a modern, user-friendly e-commerce platform built with Angular. It features a beautiful homepage, a login system, and integration with Google OAuth, it enables the user to add, edit and delete products to sell online (visual only for now).

![image](https://github.com/user-attachments/assets/c1ba475f-04bf-45a6-aa27-323ffafaed2b)
![image](https://github.com/user-attachments/assets/1a20be9a-b435-4ef8-b6f6-e2353207748e)
![image](https://github.com/user-attachments/assets/b8ff9c0b-ded4-4b9c-8755-a2235510d974)

## Features

- **Beautiful Homepage**: A clean and modern homepage.
- **Login System**: A login form with email and password fields.
- **Google OAuth Login**: Allows login through google account.
- **Responsive Design**: The application is fully responsive and works seamlessly on all devices.
- **Product Management**: Add, edit, and delete products (Admin role required).
- **Role-Based Access**: Different features available based on user roles.

## Getting Started

You can run this application either locally or using Docker. Choose the method that best suits your needs.

### Prerequisites

#### Local Development
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Angular CLI](https://angular.io/cli) (v15 or higher recommended)
- [Git](https://git-scm.com/)

#### Docker Deployment
- [Docker](https://www.docker.com/products/docker-desktop) (v20.10 or higher recommended)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Luanbonfim/ecommerce-platform-app
   cd ecommerce-platform-app
   ```

### Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   # On Windows (PowerShell)
   $env:GOOGLE_CLIENT_ID="your_google_client_id"
   
   # On Windows (Command Prompt)
   set GOOGLE_CLIENT_ID=your_google_client_id
   
   # On Linux/Mac
   export GOOGLE_CLIENT_ID=your_google_client_id
   ```

3. **Generate SSL certificates** (for HTTPS):
   ```bash
   npm run generate-ssl
   ```
   This will create self-signed certificates in the `ssl` directory. These certificates are for local development only and will trigger a security warning in your browser.

4. **Start the development server**:
   ```bash
   # For HTTP
   npm start
   
   # For HTTPS
   npm run start:ssl
   ```

5. **Access the application**:
   - HTTP: Open your browser and navigate to `http://localhost:4200`
   - HTTPS: Open your browser and navigate to `https://localhost:4200`
   
   > **Note**: When using HTTPS, your browser will show a security warning because we're using a self-signed certificate. This is normal for local development. You can proceed by accepting the security risk in your browser.

### Running with Docker

1. **Build the Docker image with environment variables**:
   ```bash
   docker build \
     --build-arg GOOGLE_CLIENT_ID=your_google_client_id \
     -t ecommerce-platform-app .
   ```

2. **Run the container**:
   ```bash
   docker run -p 4200:4200 ecommerce-platform-app
   ```

3. **Access the application**:
   Open your browser and navigate to `http://localhost:4200`

> **Note**: The environment variables are injected during the build process. If you need to change any values, you'll need to rebuild the image.

### Development Notes

- The application uses Angular's standalone components
- Authentication is handled through JWT tokens
- Product management features require Admin role
- The application is configured to work with a backend API

### Environment Setup

The application uses Angular's environment files for configuration. There are two environments:

1. **Development** (`src/environments/environment.ts`):
   - Contains non-sensitive development values
   - Used when running `ng serve`
   - Values are committed to version control
   - Contains empty placeholders for sensitive values
   - Requires environment variables to be set locally

2. **Production** (`src/environments/environment.prod.ts`):
   - Contains non-sensitive production values
   - Used when running `ng build --configuration production`
   - Values are committed to version control
   - Contains empty placeholders for sensitive values
   - Values are replaced during Docker build

#### Handling Sensitive Data

1. **Local Development**:
   - Set environment variables in your system
   - No sensitive values in source code
   - Values are replaced during build time

2. **Production Deployment**:
   - Never commit sensitive values to version control
   - Use build arguments during Docker build
   - Values are replaced during the build process
   - For cloud platforms (AWS, GCP, Azure), use their secrets management services

### Available Scripts

- `npm start` - Start the development server (HTTP)
- `npm run start:ssl` - Start the development server with HTTPS
- `npm run generate-ssl` - Generate SSL certificates for local HTTPS
- `npm run build` - Build the application for production
- `npm test` - Run unit tests
- `npm run lint` - Run linting

### Troubleshooting

#### Local Development
- If you encounter dependency issues, try deleting `node_modules` and running `npm install` again
- Make sure all environment variables are properly set
- Check the browser console for any errors

#### Docker
- If the container fails to start, check the logs with `docker logs <container_id>`
- Ensure port 4200 is not in use by another application
- Try rebuilding the image if you've made changes to the source code
- Make sure all required build arguments are provided

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
