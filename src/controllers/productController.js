//const fs = require('fs')
const express = require('express');

const Product= require('../models/product.model');
// const multer  = require('multer')
const {uploadSingle,uploadmultipal} = require('../middlewares/upload' )


const router = express.Router();

router.get("", async(req,res)=>{
  try {
    const product = await Product.find().lean().exec();

    return res.send(product);
  } catch (err) {
    return res.status(500).send(err);
  }
} );


router.post('/single', uploadSingle("image_urls"), async(req, res)=> {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
   try {
    //  console.log(req.file, req.body)
    // console.log("path:",req.file.path )
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      image_urls:req.file.path
    });

    return res.send({ product });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/multiple', uploadmultipal(2, "image_urls"), async(req, res)=> {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  try {
   //  console.log(req.file, req.body)
   const filePaths = req.files.map((file) =>file.path )
   
   const product = await Product.create({
     name: req.body.name,
     price: req.body.price,
     image_urls:filePaths
   });

   return res.send({ product });
 } catch (err) {
   return res.status(500).send(err);
 }
});




// router.patch( '/:id',async(req, res) =>{
 
//   const placeId = req.params.id;

//   try {
//     const product = await Product.findById(placeId);
//     return res.status(200).send(product)
//   } catch (err) {
//     return res.status(500).send(err.message)
//   }
// });

// router.delete('/:id', async(req, res) =>{

//   const productId = req.params.id;
//   try {
//     const product = await Gallery.findById(productId).populate('creator');
//     return res.status(200).send(product)
//   } catch (err) {
//     return res.status(500).send(err.message)
//   }

// } );

module.exports = router;






