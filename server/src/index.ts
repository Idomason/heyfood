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
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', routes);

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('HeyFood API is running');
});

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

startServer();
