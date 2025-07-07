import { generateToken } from "../libs/token.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';


export const handleSignup = async (req, res) => {
    const { name , email , password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const alreadyExistingUser = await User.findOne({ email: email });
        if (alreadyExistingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userRole = email === 'hussain@gmail.com' ? 'admin' : 'user';

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            role: userRole
        });

        if(newUser){
        generateToken(newUser._id,res);
        await newUser.save();
        res.status(201).json({ 
            message: 'User created successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
        }
        else{
            res.status(400).json({ message: 'Error in creating user' });
        }
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

export const handleLogin = async (req, res) => {
    const { email , password } = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        generateToken(user._id,res);
        res.status(200).json({ 
            message: 'Login successful', 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                role: user.role
            } 
        });
        
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



export const handleLogout = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ message: 'Logout successful' });
}
