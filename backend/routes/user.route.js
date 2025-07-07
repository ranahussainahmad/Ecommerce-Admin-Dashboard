import { Router } from 'express';
import { handleLogin, handleLogout, handleSignup } from '../controllers/user.controller.js';

const router = Router();



router.post('/login', handleLogin);
router.post('/signup', handleSignup);
router.post('/logout', handleLogout);

export default router;
