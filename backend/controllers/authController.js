const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.register = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Wrong password or email!" });

        const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({ token });
    } catch (err) {
        next(err);
    }
};
