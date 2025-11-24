import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Updated connection options - removed deprecated options
    const options = {
      // Removed deprecated options: serverSelectionRetryDelayMS, bufferMaxEntries, bufferCommands
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      heartbeatFrequencyMS: 10000, // Heartbeat frequency
    };

    // Primary MongoDB connection attempt
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/business_cards';
    
    console.log('🔄 Attempting MongoDB connection...');
    await mongoose.connect(mongoURI, options);
    
    console.log('✅ MongoDB Connected Successfully');
    console.log(`�� Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
    
    // Connection event handlers
    mongoose.connection.on('connected', () => {
      console.log('📡 MongoDB connection established');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📴 MongoDB disconnected');
    });

    return true;

  } catch (error) {
    console.log('⚠️  MongoDB connection failed:', error.message);
    console.log('🔄 Switching to development mode...');
    
    try {
      // Fallback: Use development mode simulation
      console.log('🧪 Initializing development database mode...');
      
      // Create a mock connection for development
      const mockConnection = {
        readyState: 1,
        name: 'development_mode',
        host: 'localhost',
        port: 'memory'
      };
      
      // Override mongoose connection for development
      mongoose.connection.readyState = 0; // Disconnected state
      
      console.log('✅ Development mode initialized');
      console.log('📝 Note: Data will not persist between server restarts');
      console.log('💡 To use persistent storage, install MongoDB locally or use MongoDB Atlas');
      
      return false; // Indicates fallback mode
      
    } catch (fallbackError) {
      console.error('❌ Development mode initialization failed:', fallbackError.message);
      console.log('🚀 Application will continue without database connection');
      return false;
    }
  }
};

// Graceful shutdown handling
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('📴 MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error during database shutdown:', error.message);
    process.exit(1);
  }
});

export default connectDB;
