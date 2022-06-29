const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors= require('colors');
const connectDB = require('./config/db');
const morgan = require ('morgan')
const fileupload = require('express-fileupload')
const cookieParser= require("cookie-parser")
const errorHandler =require('./middleware/error')



// Load env vars
dotenv.config({ path: './config/config.env' });


//connecct to database
connectDB()

//Route files
const blogs = require('./routes/blogs')
const events = require('./routes/events')

const app = express();

//Body parser
app.use(express.json())
app.use(cookieParser());




// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  
// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
//Mount Routers
app.use('/api/v1/blogs', blogs)
app.use('/api/v1/events', events)

app.use(errorHandler)











const PORT = process.env.PORT || 4000;
const server = app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
  );


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
   //server.close(() => process.exit(1));
});