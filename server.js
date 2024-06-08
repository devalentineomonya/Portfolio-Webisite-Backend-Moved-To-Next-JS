/*========================
CONSTANT IMPORTS
==========================*/

const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./src/config/databaseConnection')
const projectRouter = require('./src/routes/projectRoutes')
const usersRouter = require('./src/routes/userRoutes')
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config()
const app = express()


/*========================
UNIVERSAL MIDDLEWARE
========================== */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


/*===========================
UNIVERSAL VARIABLES 
============================= */
const port = process.env.PORT || 3000



/*===========================
API ROUTE ENDPOINTS
=============================*/
app.get("/",(req, res) => {
    res.send("Welcome to devalentine API 😎")
})


app.use("/api/images", express.static('src/uploads'))
app.use("/api/projects", projectRouter);
app.use("/api/users", usersRouter);




/*==========================
START NODE SERVER 
============================ */
const start = () =>{
    try {
        connectDb()
        app.listen(port, ()=>{
            console.log("Server running on port " + port);
        })

    } catch (error) {
        console.log("An error occurred while starting node server", error.message);
    }
}

start()




