const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDb = require('./src/config/databaseConnection');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRouter = require('./src/routes/projectRoutes');
const usersRouter = require('./src/routes/userRoutes');
const authRouter = require('./src/routes/authRoutes');
const skillsRouter = require('./src/routes/skillRoutes');
const languagesRouter = require('./src/routes/languageRoutes');
const partnersRouter = require('./src/routes/partnerRoutes');
const testimonialsRouter = require('./src/routes/testimonialRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set("view engine", "ejs")
app.set("views","src/views")


app.get("/", (req, res) => res.render("index"));

app.use("/api/images", express.static('src/uploads'));
app.use("/api/projects", projectRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/languages", languagesRouter);
app.use("/api/partners", partnersRouter);
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
