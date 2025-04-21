# AssetTrackr

A web application to help users manage their investments including fixed deposits, properties, and stocks.

## Features

- User authentication (register, login)
- Dashboard with investment summary and charts
- Management of different investment types:
  - Fixed Deposits
  - Properties
  - Stocks
- Investment performance visualization

## Technologies

- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS for styling
- MongoDB & Mongoose for database (currently mocked)
- NextAuth.js for authentication

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/AssetTrackr.git
cd AssetTrackr
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory with:
```
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

### Deployment on Vercel

1. Push your repository to GitHub
2. Import the repository to Vercel
3. Set the environment variables in Vercel dashboard
4. Deploy

## Project Structure

- `src/app` - Next.js App Router pages and API routes
- `src/components` - Reusable React components
- `src/lib` - Utility functions and configurations
- `src/models` - MongoDB data models
- `src/types` - TypeScript type definitions

## License

This project is licensed under the MIT License 