import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
  ? [ 'https://sophistiqueluxe-production.up.railway.app' ] // Correct domain
  : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'token'] // Add 'token' header
}));
app.use(express.json())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.use(express.static(path.join(__dirname, '../frontend/dist')))
app.use('/admin', express.static(path.join(__dirname, '../admin/dist')))

// Health check for debugging
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    time: new Date().toISOString() 
  });
});

// Handle client-side routing for admin panel
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/dist/index.html'));
});

// Handle client-side routing for frontend (catch-all)
app.get('*', (req, res) => {
  // Don't handle API or admin routes here
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
});

app.listen(port, ()=> console.log('Server started on PORT : '+ port))