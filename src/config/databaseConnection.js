const mongoose = require("mongoose")
const connectDb = async () => {
    try {
        const connectionString = process.env.CONNECTION_STRING || "mongodb://localhost:27017/devalentineProjects";
        await mongoose.connect(connectionString).then(() => {
            console.log("Database connected successfully.");
        })
    } catch (error) {
        console.log("An error occurred while connecting to MongoDB", error.message);
    }
}


module.exports = connectDb