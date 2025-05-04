import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initializeDatabase } from './config/db';

// Routes
import routes from './routes';
import { seedDatabase } from './config/seed';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://heyfood.vercel.app'
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api', routes);

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('HeyFood API is running');
});

// Handle OPTIONS preflight requests
app.options('*', cors());

// Start server
const startServer = async () => {
  try {
    // Initialize database 
    await initializeDatabase();

    // Seed database with sample data
    await seedDatabase();
     
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Only start the server when not in production (not in Vercel serverless environment)
if (process.env.NODE_ENV !== 'production') {
  startServer();
}

// Initialize database in serverless environment
initializeDatabase().catch(err => console.error('Failed to initialize database:', err));

// Export the Express app for Vercel serverless functions
export default app;
