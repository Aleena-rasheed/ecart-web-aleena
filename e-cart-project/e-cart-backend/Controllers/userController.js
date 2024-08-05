const users=require('../Models/userSchema')
const jwt=require('jsonwebtoken')

//Logic of Register
exports.register=async(req,res)=>{
    const{username,email,password}=req.body
    try{
        const existingUser= await users.findOne({email})

        if(existingUser){
            res.status(404).json("User Already Registered")
        }
        else{
            const newUser=new users({username,email,password})
            await newUser.save()
            res.status(200).json(newUser)
        }

    }
    catch(err){
        res.status(404).json(err)
    }
}

//Login Logic
exports.login=async(req,res)=>{
    const{email,password}=req.body
    try{
        const existingUser= await users.findOne({email,password})
        if(existingUser){
            const token= jwt.sign({userId:existingUser._id},process.env.JWTKEY)
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(402).json("Incorrect Email Or Password")
        }

    }
    catch(err){
        res.status(404).json(err)
    }
}