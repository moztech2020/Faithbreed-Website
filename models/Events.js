const mongoose = require('mongoose');
const slugify = require('slugify');


const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a tittle'],
      unique: true,
      trim: true,
      maxlength: [50, 'Title can not be more than 50 characters']
    },
   
    photo: {
        type: String,
        default: 'no-photo.jpg'
      },
    
      body: {
        type: String,
        required: [true, 'Please add a body content'],
        unique: true,
        trim: true,
        maxlength: [500, 'Body can not be more than 500 characters']
      },
     

   
         
    slug: String,
   
   
   
    createdAt: {
      type: Date,
      default: Date.now
    },
    
 

});

// Create bootcamp slug from the title
BlogSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});


module.exports = mongoose.model('Event', BlogSchema);




