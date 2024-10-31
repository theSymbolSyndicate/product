# Avatar Platform

A Next.js web app for managing avatar requests. Team members can register, submit requests with reference images, and track progress. The design team can view, assign, and update the status of requests.

## Folder Structure

```plaintext
avatar-platform/
├── app/              # App pages, routes and UI components
├── config/           # Configuration for the project
├── constants/        # Global constants used throughout the application
├── styles/           # Global SCSS files
└── utils/            # Utility functions and helpers
```

## Environment Variables

All environment variables listed below are required for both development and production modes.

### Public Environment Variables

These variables are prefixed with `NEXT_PUBLIC_` and are exposed to the browser, meaning they can be accessed both on the server and in the client-side code.

- **`NEXT_PUBLIC_SUBDIRECTORY`**: The subdirectory where the application is hosted, used to correctly load static assets and handle routing. Example: `/website`. If your application is hosted in a subdirectory like `https://company.com/website`, this variable should be set to `/website` otherwise do not set this variable.

- **`NEXT_PUBLIC_WEBSITE_URL`**: The URL of the live website. This is typically the base URL where the application is hosted. Example: `https://company.com/website`.

- **`NEXT_PUBLIC_REQUEST_TIMEOUT`**: The timeout duration (in milliseconds) for network requests made by the application. Example: `6000` (6 seconds).

## Requirements

- Node.js v20.11.0

**Important**: For security reasons, the website **must** be served over HTTPS to ensure that sensitive information like the admin password is transmitted securely over an encrypted connection. Sending passwords over an unencrypted HTTP connection poses significant security risks.

## Installation

This project is part of a Product monorepo. Follow the steps below to set up and run the project.

1. Clone the repository from GitHub:
   ```bash
   git clone <URL>
   ```

2. Navigate to the project folder:
   ```bash
   cd tools/avatar-platform
   ```

3. Install Node.js dependencies:
   ```bash
   npm install
   ```

4. Setup environment variables (or create `.env` file in root directory).

## Building the Project

To build the project, run:
```bash
npm run build
```

## Running the Project

To run the built project, use:
```bash
npm run start
```

## Development Server

To run the development server, use:
```bash
npm run dev
```
