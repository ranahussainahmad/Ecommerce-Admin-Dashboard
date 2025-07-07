import mongoose from 'mongoose';

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw new Error('Database connection failed'); 
    }
}

export default connectionDB;
