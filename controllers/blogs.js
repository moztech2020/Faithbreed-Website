 const path = require('path');
 const ErrorResponse = require('../utils/errorResponse');
 const asyncHandler = require('../middleware/async');
 const Blog = require('../models/Blog');
const errorHandler = require('../middleware/error');









// @desc      Get all blogs from data base
// @route     GET /api/v1/blogs
// @access    Public
exports.getBlogs = asyncHandler( async (req, res, next) => {
  
    
  res.status(200).json
  (res.advancedResults
  
  );





});
  
  

  
  
// @desc      Get single blog
// @route     GET /api/v1/blogs/:id
// @access    Public
exports.getBlog = asyncHandler(async (req, res, next) => {

    const blog  = await Blog.findById(req.params.id); 
    if (!blog) {
      return   next(new ErrorResponse (`Blog not found with ID of ${req.params.id}`, 404))
     }
    res.status(201).json
      ({success:true, 
       data:blog
      });
  
    });
  
  
  // @desc      create new  blog
// @route     POST /api/v1/blogs
// @access    Private

exports.createBlog = asyncHandler(async (req, res, next) => {
  

  const blog  = await Blog.create(req.body); 
  res.status(201).json
    ({success:true, 
     data:blog
    });

  


  
    
  });

   
  // @desc      update existing blog  blog
// @route     PUT /api/v1/blogs/:id
// @access    Private
exports.updateBlog = asyncHandler(async (req, res, next) => {
  
    const blog  = await Blog.findByIdAndUpdate(req.params.id, req.body,{
      new:true,
      runValidators:true
    }); 
    if (!blog) {
     return   next(new ErrorResponse (`Blog not found with ID of ${req.params.id}`, 404))
    }
    res.status(201).json
      ({success:true, 
       data:blog
      });
  
 
  });

  
  // @desc      delete blog
// @route     DELETE /api/v1/blogs/:id
// @access    Private
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  
    const blog  = await Blog.findByIdAndDelete(req.params.id); 
    if (!blog) {
     return  next(new ErrorResponse (`Blog not found with ID of ${req.params.id}`, 404))
    }
    res.status(201).json
      ({success:true, 
       data:[]
      });

    
 
  });

   // @desc      Upload photo for bootcamp
// @route     PUT /api/v1/bootcamps/:id/photo
// @access    Private
exports.PhotoUpload = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  
  // // Make sure user is bootcamp owner
  // if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.user.id} is not authorized to update this bootcamp`,
  //       401
  //     )
  //   );
  // }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  //console.log(req.files)
  const file = req.files.file;
  

    // Make sure the image is a photo
     if (!file.mimetype.startsWith('image')) {
       return next(new ErrorResponse(`Please upload an image file`, 400));
     }
  
     // Check filesize which should be 1MB
     if (file.size > process.env.MAX_FILE_UPLOAD) {
       return next(
        new ErrorResponse(
           `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
           400
         )
       );
    }
  
     // Create custom filename
     file.name = `photo_${blog._id}${path.parse(file.name).ext}`;
     console.log(file.name)
  //moving the file and saving it locally
     file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
       if (err) {
         console.error(err);
         return next(new ErrorResponse(`Problem with file upload`, 500));
     }
  //uploading the file name
       await Blog.findByIdAndUpdate(req.params.id, { photo: file.name });
  
       res.status(200).json({
        success: true,
        data: file.name
       });
      });
   });


 

