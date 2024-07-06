const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDb = require('./src/config/databaseConnection');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRouter = require('./src/routes/projectRoutes');
const usersRouter = require('./src/routes/userRoutes');
const authRouter = require('./src/routes/authRoutes');
const languagesRouter = require('./src/routes/languageRoutes');
const certificatesRouter = require('./src/routes/certificateRoutes');
const testimonialsRouter = require('./src/routes/testimonialRoutes');
const stacksRouter = require('./src/routes/stackRoutes');
const collaboratorRoutes = require('./src/routes/collaboratorRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(cors());
app.set("view engine", "ejs")
app.set("views","src/views")


app.get("/", (req, res) => res.render("index"));

app.use("/api/images", express.static(path.join(__dirname,'src/uploads')));
app.use("/api/projects", projectRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/stacks",stacksRouter );
app.use("/api/languages", languagesRouter);
app.use("/api/certificates", certificatesRouter);
app.use("/api/collaborators", collaboratorRoutes)
app.use("/api/testimonials", testimonialsRouter)

app.use("/*", (req, res) => {
    res.status(404).json({ success: false, message: "The Route you visited is unknown to us" })
})


const startServer = async () => {
    try {
        await connectDb();
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.error("Error starting server:", error.message);
    }
};

startServer();
