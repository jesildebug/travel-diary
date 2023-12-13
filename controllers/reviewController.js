import Tour from "../models/Tour.js";
import Review from "../models/Review.js";


// export const  createReview = async(req,res)=>{

//     const tourId = req.params.tourId
//     const newReview = new Review({...req.body})
//     try {
//        const savedReview =  await newReview.save() 
//        console.log(newReview,'saved');
//     //    after creating a new review now update the reviews array of the tour

//     await Tour.findByIdAndUpdate(tourId,{
//         $push:{reviews:savedReview._id}
//     })
//     console.log(newReview,'revie');

//     res.status(200).json({
//     success:true,
//     message:'Review submitted',
//     data:
//     savedReview})
//     } catch (err) {
//         res.status(500).json({
//             success:false ,
//             message:'Failed to submit',
//             })
//     }
// }



export const createReview = async (req, res) => {
    
    const { tourId } = req.params;
    const newReview = new Review({ ...req.body });
    const { rating } = req.body;

    if (rating === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Invalid data: rating is required',
        });
    }

    // if (isNaN(rating)) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Invalid data: rating must be a number',
    //     });
    // }

    try {
        // Save the new review
        const savedReview = await newReview.save();
        console.log(`Review saved: ${savedReview}`);

        // Update the tour with the new review
        const updatedTour = await Tour.findByIdAndUpdate(
            tourId,
            { $push: { reviews: savedReview._id } },
            { new: true, useFindAndModify: false }  // return the updated tour
        );

        if (!updatedTour) {
            console.log(`Tour not found with id: ${tourId}`);
            return res.status(404).json({
                success: false,
                message: 'Tour not found',
            });
        }

        console.log(`Review added to tour: ${updatedTour}`);
        
        res.status(200).json({
            success: true,
            message: 'Review submitted',
            data: savedReview
        });
    } catch (err) {
        console.error(`Error: ${err.message}`);  // Log the error message for debugging
        res.status(500).json({
            success: false,
            message: 'Failed to submit review',
            error: err.message  // Send the error message in the response
        });
    }
};

