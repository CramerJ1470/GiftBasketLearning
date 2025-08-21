
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import learningRoutes from './routes/learning.js';
import clientsRoutes from './routes/clients.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get('/', (req,res)=> res.json({ status:'Gift Basket API OK (no-stripe)' }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/clients', clientsRoutes);

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI).then(()=>{
  app.listen(PORT, ()=> console.log(`🚀 Server listening on ${PORT}`));
});
