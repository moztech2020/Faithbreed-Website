
const express = require('express');
const dotenv = require('dotenv');
const colors= require('colors');


// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/', (req, res) =>{
    res.send('HOME PAGE FRO FAITHBREED WEBSITE')
});




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