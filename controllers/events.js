const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Event = require('../models/Event');
const errorHandler = require('../middleware/error');









// @desc      Get all events
// @route     GET /api/v1/events
// @access    Public
exports.getEvents = asyncHandler( async (req, res, next) => {
 
   
 res.status(200).json
 (res.advancedResults
 
 );





});
 
 

 
 
// @desc      Get single event
// @route     GET /api/v1/event/:id
// @access    Public
exports.getEvent = asyncHandler(async (req, res, next) => {

   const event  = await Event.findById(req.params.id); 
   if (!event) {
     return   next(new ErrorResponse (`Event not found with ID of ${req.params.id}`, 404))
    }
   res.status(201).json
     ({success:true, 
      data:event
     });
 
   });
 
 
 // @desc      create new  event
// @route     POST /api/v1/event
// @access    Private

exports.createEvent = asyncHandler(async (req, res, next) => {
 

 const event  = await Event.create(req.body); 
 res.status(201).json
   ({success:true, 
    data:event
   });

 


 
   
 });

  
 // @desc      update existing event
// @route     PUT /api/v1/event/:id
// @access    Private
exports.updateEvent = asyncHandler(async (req, res, next) => {
 
   const event  = await Event.findByIdAndUpdate(req.params.id, req.body,{
     new:true,
     runValidators:true
   }); 
   if (!event) {
    return   next(new ErrorResponse (`Event not found with ID of ${req.params.id}`, 404))
   }
   res.status(201).json
     ({success:true, 
     
     });
 

 });

 
 // @desc      delete event
// @route     DELETE /api/v1/event/:id
// @access    Private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
 
   const event  = await Event.findByIdAndDelete(req.params.id); 
   if (!event) {
    return  next(new ErrorResponse (`Event not found with ID of ${req.params.id}`, 404))
   }
   res.status(201).json
     ({success:true, 
      data:[]
     });

   

 });

//   // @desc      Upload photo for event
// // @route     PUT /api/v1/events/:id/photo
// // @access    Private
// exports.PhotoUpload = asyncHandler(async (req, res, next) => {
//  const event = await Event.findById(req.params.id);

//  if (!event) {
//    return next(
//      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
//    );
//  }


//  if (!req.files) {
//    return next(new ErrorResponse(`Please upload a file`, 400));
//  }
//  //console.log(req.files)
//  const file = req.files.file;
 

//    // Make sure the image is a photo
//     if (!file.mimetype.startsWith('image')) {
//       return next(new ErrorResponse(`Please upload an image file`, 400));
//     }
 
//     // Check filesize which should be 1MB
//     if (file.size > process.env.MAX_FILE_UPLOAD) {
//       return next(
//        new ErrorResponse(
//           `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
//           400
//         )
//       );
//    }
 
//     // Create custom filename
//     file.name = `photo_${event._id}${path.parse(file.name).ext}`;
//     console.log(file.name)
//  //moving the file and saving it locally
//     file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
//       if (err) {
//         console.error(err);
//         return next(new ErrorResponse(`Problem with file upload`, 500));
//     }
//  //uploading the file name
//       await Event.findByIdAndUpdate(req.params.id, { photo: file.name });
 
//       res.status(200).json({
//        success: true,
//        data: file.name
//       });
//      });
//  });




