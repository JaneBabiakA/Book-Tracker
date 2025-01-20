const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(req.headers);
        console.log(token);
        const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
        const user = decodedToken;
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Unauthorized access" });
    }
}