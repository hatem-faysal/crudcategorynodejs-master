const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const bodyparser = require('body-parser');

dotenv.config({
  path: 'config.env'
});
const ApiError = require('../app/Utils/apiError');
const globalError = require('../app/Http/Middlewares/errorMiddleware');
const dbConnection = require('../config/database');

// Route
const routes = require('../routes/web');
//Connect with db
dbConnection();

//express app
const app = express();

//Middleware
app.use(express.json());

//Parse request to body-parser
app.use(bodyparser.urlencoded({
  extended: true
}))


// Mount Routes Wep
app.use('/', routes);


// app.all('*', (req, res, next) => {
//   next(new ApiError(`Cant't find this route: ${req.originalUrl}`, 400));
// });

// Global error handling middleware for express
// app.use(globalError);

app.set('views', 'resources/views');
app.set("view engine", "ejs")

//load assets
app.use('/css', express.static(path.resolve(__dirname, "public/assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "public/assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "public/assets/js")))


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

//Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});