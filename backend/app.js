import express from 'express';
import userRoutes from './routes/user.route.js';
import dotenv from 'dotenv';
import connectionDB from './connections.js';
import productRoute from './routes/product.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
dotenv.config();


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,               
}));



connectionDB()
app.use('/api/users', userRoutes);
app.use("/api/products", productRoute);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
