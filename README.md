# Event Requirement Posting Application - Frontend

This is the frontend for the Event Requirement Posting Application, built with Next.js and React. The application features a modern, multi-step form with premium UI components and glassmorphism.

## Tech Stack
- **Next.js**: Framework for React applications
- **Lucide React**: Icon library
- **Vanilla CSS**: Premium design system with glassmorphism

## Setup

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed.

2. **Installation**:
   ```bash
   cd eve-req-frontend
   npm install
   ```

3. **Environment Variables**: Create a `.env.local` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Ensure `NEXT_PUBLIC_API_URL` points to your active backend service.

4. **Running the Application**:
   - For development:
     ```bash
     npm run dev
     ```
   - For production build:
     ```bash
     npm run build
     ```
   - To start in production:
     ```bash
     npm start
     ```

## Features
- **Multi-step form**: Seamless user experience for posting requirements.
- **Micro-animations**: Smooth transitions and interactive elements.
- **Glassmorphism**: Modern, premium design system.
- **Responsive Design**: Tailored for both desktop and mobile devices.
