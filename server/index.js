import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { fileLogger } from './middleware/fileLogger.js';
import { initializeData } from './utils/initialData.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// CRITICAL: Force port to 5000, ignore any environment variable that might set it to 443
const PORT = 5000;

// Enhanced database connection with proper error handling
let isDatabaseConnected = false;

const initializeDatabase = async () => {
  try {
    console.log('�� Starting Business Cards Management System...');
    console.log('📊 Initializing database connection...');

    isDatabaseConnected = await connectDB();

    if (isDatabaseConnected) {
      console.log('🎯 Database connection successful - Full functionality enabled');

      // Initialize sample data only after successful DB connection
      setTimeout(async () => {
        try {
          await initializeData();
        } catch (err) {
          console.log('📝 Sample data initialization skipped:', err.message);
        }
      }, 1000);

    } else {
      console.log('🧪 Running in development mode - Limited functionality');
      console.log('💡 Install MongoDB locally or use MongoDB Atlas for full features');
    }

  } catch (err) {
    console.log('⚠️  Database initialization failed:', err.message);
    console.log('🚀 Application starting without database connection');
    isDatabaseConnected = false;
  }
};

// Initialize database connection
initializeDatabase();

// Enhanced CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://172.18.0.2:5173" // Docker network support
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('combined'));
app.use(fileLogger);

// Root route - redirect to frontend
app.get('/', (req, res) => {
  res.json({
    message: 'Business Cards Management System API',
    status: 'Running',
    frontend: 'http://localhost:5173',
    api: 'http://localhost:5000/api',
    health: 'http://localhost:5000/api/health',
    database: isDatabaseConnected ? 'Connected' : 'Development Mode'
  });
});

// Enhanced health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Business Cards Management System is running',
    port: PORT,
    database: isDatabaseConnected ? 'Connected' : 'Development Mode',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Database status endpoint
app.get('/api/database-status', (req, res) => {
  res.json({
    connected: isDatabaseConnected,
    mode: isDatabaseConnected ? 'production' : 'development',
    message: isDatabaseConnected
      ? 'Database connection active - All features available'
      : 'Running in development mode - Data will not persist'
  });
});

// Routes with database status middleware
app.use('/api/users', (req, res, next) => {
  if (!isDatabaseConnected && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    return res.status(503).json({
      message: 'Database not available. Running in development mode.',
      suggestion: 'Install MongoDB locally or use MongoDB Atlas for full functionality'
    });
  }
  next();
}, userRoutes);

app.use('/api/cards', (req, res, next) => {
  if (!isDatabaseConnected && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    return res.status(503).json({
      message: 'Database not available. Running in development mode.',
      suggestion: 'Install MongoDB locally or use MongoDB Atlas for full functionality'
    });
  }
  next();
}, cardRoutes);

// Serve static files from client build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Error handling middleware
app.use(errorHandler);

// Enhanced server startup
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n🎉 ===== SERVER STARTED SUCCESSFULLY =====');
  console.log(`�� Business Cards Management System`);
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`🌐 Network access: http://0.0.0.0:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Database status: http://localhost:${PORT}/api/database-status`);
  console.log(`🎯 Frontend: http://localhost:5173`);
  console.log(`💾 Database: ${isDatabaseConnected ? 'Connected' : 'Development Mode'}`);
  console.log('==========================================\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});
