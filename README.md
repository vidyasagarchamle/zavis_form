# Sales Verification Form

A modern Next.js application for sales verification with a beautiful UI and backend integration with Google Sheets and Zavis AI API.

## Features

- Modern, responsive UI with gradient styling and animations
- Form validation using Zod
- Backend API integration with Google Sheets for data storage
- Integration with Zavis AI API for automated calls
- TypeScript for type safety
- Modular code structure for maintainability

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Zod for validation
- Google Sheets API
- Zavis AI API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/vidyasagarchamle/zavis_form.git
cd zavis_form
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with the following variables:
```
GOOGLE_SHEETS_CLIENT_EMAIL=your-client-email
GOOGLE_SHEETS_PRIVATE_KEY=your-private-key
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This application is configured for easy deployment on Vercel.

## Project Structure

- `/app` - Next.js app directory with pages and API routes
- `/components` - React components including the VerificationForm
- `/lib` - Utility functions, types, and API helpers 