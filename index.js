import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.models.js";
import productRoute from "./routes/product.route.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoute);


app.get("/", (req, res) => {
    res.send("This Message from Node-API server updated");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});


mongoose.connect(MONGO_URI)
    .then(console.log("Database Connected Successfully"))
    .catch(() => {
        console.log("Connection Failed");
    });

