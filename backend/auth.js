const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
        const user = decodedToken;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized access" });
    }
}