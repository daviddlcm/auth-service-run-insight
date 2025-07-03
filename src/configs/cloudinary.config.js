require("dotenv").config()
const cloudinary = require('cloudinary');

const cloudinaryConnection = cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImage=async(filepath)=>{
    return await cloudinary.v2.uploader.upload(filepath,{
       folder:"promotions",
    })
}

const deleteImage=async(publicId)=>{
    return await cloudinary.v2.uploader.destroy(publicId)
}

module.exports = {
  uploadImage,
};