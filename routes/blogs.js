const express = require('express');

const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  PhotoUpload
} = require('../controllers/blogs');
const router = express.Router();

const Blog = require('../models/Blog');
const advancedResults = require('../middleware/advancedResults');

const { protect, authorize} = require('../middleware/auth');

 router
   .route('/:id/photo')
   .put (protect, PhotoUpload);

router
  .route('/')
  .get(advancedResults(Blog), getBlogs)
  .post(protect, createBlog);

router
  .route('/:id')
  .get(getBlog)
  .put(updateBlog)
  .delete(deleteBlog);

module.exports = router;
