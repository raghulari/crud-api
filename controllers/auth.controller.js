import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register User

const registerUser = async (req,res)=>{
    try {
        const {username,email,password}= req.body
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const existing = await User.findOne({email});
        if(existing){
            return res.status(409).json({message:"Email already registered"});
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            username,
            email,
            password:hashedPassword
        });
        return res.status(201).json({
            message:"User registered Successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            },
        });
    } catch(error){
        console.error("Register error : ",error);
        res.status(500).json({message:"Server Error"})
    }
}

//Login

const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({
        $or :[{email:identifier},{username:identifier}]
    });

    if(!user){
        return res.status(401).json({message:"Invalid Credentials"});
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        return res.status(401).json({message:"Invalid Credentials"})
    }
    const payload = {
        userId: user._id,
        username:user.username
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
        message:"Login Successful",
        token,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        },
    })
  }
  catch(error){
        console.error("Register error : ",error);
        res.status(500).json({message:"Login Error"})
    }
}

//Dashboard

const dashboard = (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).send("Access Denied");

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.username) {
      return res.send(`Welcome, ${decoded.username}`);
    } else {
      return res.status(401).send("Access Denied");
    }
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(401).send("Access Denied");
  }
};


export {registerUser,loginUser,dashboard};