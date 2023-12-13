import express from 'express'
import { allUser, createUser, deleteUser, getSingleUser, updateUser } from '../controllers/userController.js';


const router = express.Router()

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';



// update user
router.put('/:id',verifyUser, updateUser);

// delete user
router.delete('/:id',verifyUser, deleteUser);

// getSingle user
router.get('/:id',verifyUser, getSingleUser);

// geAll users
router.get('/',verifyAdmin, allUser);

export default router;
