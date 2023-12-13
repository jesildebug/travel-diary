import express from 'express';


import { verifyUser } from '../utils/verifyToken.js';
import {createBookingWithPayPal } from '../controllers/payment.js'

const router = express.Router()

router.post('/',verifyUser,createBookingWithPayPal)

export default router;