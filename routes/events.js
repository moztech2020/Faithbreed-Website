const express = require('express');

const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  PhotoUpload
} = require('../controllers/events');
const router = express.Router();

const Events = require('../models/Events');
const advancedResults = require('../middleware/advancedResults');

const { protect} = require('../middleware/auth');

 router
   .route('/:id/photo')
   .put (protect, PhotoUpload);

router
  .route('/')
  .get(advancedResults(Event), getEvents)
  .post(protect, createEvent);

router
  .route('/:id')
  .get(getEvent)
  .put(updateEvent)
  .delete(deleteEvent);

module.exports = router;
