/*========================
CONSTANT IMPORTS
==========================*/

const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./src/config/databaseConnection')
const projectRouter = require('./src/routes/projectRoutes')
const app = express()


/*========================
UNIVERSAL MIDDLEWARE
========================== */
app.use(express.json())
app.use(express.urlencoded({extended:true}))



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


app.use("/api/images", "src/uploads")

app.use("/api/projects", projectRouter);
app.use("/api/users", userRouter);




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




