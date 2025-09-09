import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import clientRoutes from './routes/clientRoutes.mjs';

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

app.use(morgan('dev'));

app.use('/api/clients', clientRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to the database');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err.message);
  });