
import User from '../models/User.js'


// crete new user

export const createUser = async(req,res)=>{
    const newUser = new User(req.body)
    try {
        const savedUSer = await newUser.save()
        res.status(200).json({success:true,message:'Successfully Created',data:savedUSer,})
    } catch (err) {
        res.status(500).json({success:false,message:'Failed to create .Try again'})
    }
}

// update user

export const updateUser = async(req,res)=>{
    const id = req.params.id
    try {
        const updatedUser =  await User.findByIdAndUpdate(id,
            {$set:req.body},{new:true})
            res.status(200).json({success:true,message:'Successfully Updated',data:updatedUser})
    } catch (err) {
        res.status(500).json({success:false,message:'Failed to update'})
    }
}

// delete user

export const deleteUser = async(req,res)=>{
    const id = req.params.id
    try {
         await User.findByIdAndDelete(id)
            res.status(200).json({success:true,message:'Successfully Deleted'})
    } catch (err) {
        res.status(500).json({success:false,message:'Failed to delete'})
    }
}

// getSingle User

export const getSingleUser = async(req,res)=>{
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      res.status(200).json({
        success:true,
        message:"Successfull",
        data:user
      })
    } catch (err) {
        res.status(404).json({
            success:false,
            message:"Not found" 
        })
    }
}

// getAllUser


export const allUser = async (req, res) => {
    try {
      const users = await User.find({});
  
      res.status(200).json({
        success: true,
        message: "Successfully retrieved users",
        data: users,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve users",
      });
    }
  };
  