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
app.use(express.json())
app.use(cors({
  origin: '*', // Or specify your domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'token'],
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 24 hours
}));

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use('/admin', express.static(path.join(__dirname, '../admin/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.get('/admin*', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dist/index.html'))
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, ()=> console.log('Server started on PORT : '+ port))