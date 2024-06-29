const jwt = require('jsonwebtoken');
const userModels = require('../models/userModels');

const authMiddleware = async (req, res, next) => {
    const bearerToken = req.headers.authorization || "";
    
    try {
        if (bearerToken?.startsWith("Bearer ")) {
            const token = bearerToken.split(" ")[1];
            const jwtSecret = process.env.JWT_SECRET_STRING || 'jwtsuperstrongsecretstring';
            const decodedToken = jwt.verify(token, jwtSecret);
            
            const user = await userModels.findOne({ _id: decodedToken.id });

            if (user) {
                req.user = user;
                req.currentUserId = decodedToken.id;
                return next();
            }
        }

        res.status(401).json({ success: false, message: "User token is expired or invalid. Please provide a valid token or log in again." });

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while verifying user: " + error.message });
    }
};

const isAdmin = (req, res, next) => {
    try {
        const user = req.user;

        if (user.isAdmin) {
            return next();
        }

        res.status(403).json({ success: false, message: "You don't have admin privileges to perform this action." });

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while verifying user: " + error.message });
    }
};

module.exports = { authMiddleware, isAdmin };
