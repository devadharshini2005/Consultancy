import express from 'express'
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js'
//import { getUserProfile } from '../controllers/userController.js';
import { verifyUser } from '../middleware/auth.js';







const userRouter = express.Router();
//userRouter.get('/profile', verifyUser, getUserProfile);
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter;