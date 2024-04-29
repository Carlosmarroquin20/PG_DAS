const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jws = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Coneccion de base de datos con MongoDB
mongoose.connect("mongodb+srv://Ema322:Master322GG@cluster0.j2f0i2y.mongodb.net/DasCommerce");

// Creacion de API

app.get("/",(req,res)=>{
    res.send("La App Express esta corriendo al 100 :)")
})

app.listen(port,(error)=>{
    if (!error) {
        console.log("Server corriendo en puerto: "+port)   
    }
    else{
        console.log("Error : "+error)
    }

})