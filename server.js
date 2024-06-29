const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./src/config/databaseConnection');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRouter = require('./src/routes/projectRoutes');
const usersRouter = require('./src/routes/userRoutes');
const authRouter = require('./src/routes/authRoutes');
const skillsRouter = require('./src/routes/skillRoutes');
const languagesRouter = require('./src/routes/languageRoutes');
const partnersRouter = require('./src/routes/partnerRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => res.send("Welcome to devalentine API 😎"));

app.use("/api/images", express.static('src/uploads'));
app.use("/api/projects", projectRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/languages", languagesRouter);
app.use("/api/partners", partnersRouter);

const startServer = async () => {
    try {
        await connectDb();
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.error("Error starting server:", error.message);
    }
};

startServer();
