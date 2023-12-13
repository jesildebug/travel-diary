import express from 'express'

import { createTour, deleteTour, getAllTour, getSingleTour, updateTour, getTourBySearch, getFeaturedTour, getTourCount } from '../controllers/tourController.js'
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router()

// create new tour

router.post('/',verifyAdmin,createTour);

// update Tour
router.put('/:id',verifyAdmin,updateTour);

// delete tour
router.delete('/:id',verifyAdmin,deleteTour);

// getSingle Tour
router.get('/:id',getSingleTour);

// geAll Tour
router.get('/',getAllTour);

// getTour By Search

router.get('/search/getTourBySearch',getTourBySearch)
router.get('/search/getFeaturedTours',getFeaturedTour)
router.get('/search/getTourCount',getTourCount) 




export default router;