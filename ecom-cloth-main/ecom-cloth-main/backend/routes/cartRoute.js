import express from 'express'
import authUser from '../middleware/auth.js'
import { getUserCart, updateCart, addToCart } from '../controllers/cartController.js' // <-- Fix: import correct controller

const cartRouter = express.Router()

cartRouter.post('/get', authUser, getUserCart)
cartRouter.post('/add', authUser, addToCart) // <-- Fix: replace addProduct with addToCart
cartRouter.post('/update', authUser, updateCart)

export default cartRouter;
