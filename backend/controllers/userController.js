const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

const UserController = {
    async create(req, res){
        const password = await bcrypt.hash(req.body.password, 10);
        try {
            const user = new User({
                email: req.body.email,
                password: password
            });
            await user.save();
            const token = jwt.sign({ userId: user._id, userEmail: user.email }, "RANDOM-TOKEN", { expiresIn: "24h" });
            const date = new Date();
            date.setDate(date.getDay() + 1);
            res.status(201).json({ token, expiry: date });
        } catch(err) {
            res.status(500).json({ message: err.message })
        }
    },
    async login(req, res){
        try {
            const user = await User.findOne({ email: req.body.email });
            if(user.password && bcrypt.compare(req.body.password, user.password)){
                const token = jwt.sign({ userId: user._id, userEmail: user.email }, "RANDOM-TOKEN", { expiresIn: "24h" });
                const date = new Date();
                date.setDate(date.getDay() + 1);
                res.status(200).json({ token, expiry: date });
            } else {
                res.status(404);
            }
        } catch {
            res.status(404);
        }
    }
};

module.exports = UserController;