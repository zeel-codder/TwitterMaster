import multer  from 'multer';
import express, { Router, Request, Response } from "express";

var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
    secure: true
});

const storage = multer.diskStorage({
    destination: function (req:Request, file:any, cb:Function) {

      // console.log(file);
      cb(null, `./${process.env.CLOUDINARY_CLOUD_NAME}/files`)
    },
    filename: function (req:Request, file:any, cb:Function) {
      const uniqueSuffix:string = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  new Date().toISOString() + file.originalname);
      // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
  
const upload = multer({ storage: storage })


export {cloudinary,upload};