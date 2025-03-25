const { validationResult } = require('express-validator')
const UserModel = require('../models/Users.model')
const { createUser } = require('../services/Users.services')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        const findUser = await UserModel.findOne({ email: email })
        if (findUser) {
            return res.status(200).json({ message: "User exist." })
        }

        const hashedPassword = await UserModel.hashPassword(password);
        const user = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        })

        const token = user.generateAuthToken();
        res.cookie('token', token)
        return res.status(201).json({ token: token, uesr: user });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { password, email } = req.body;
        const user = await UserModel.findOne({ email: email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const checkPassword = await user.comparePassword(password);
        if (!checkPassword) {
            return res.status(401).json({ message: "incorrect password" })
        }

        const token = user.generateAuthToken();
        res.cookie('token', token);
        return res.status(200).json({ success: true, token: token });

    } catch (error) {
        return res.status(400).json({ error: 'Internal Server Error' })
    }
}

module.exports.uploadPicture = async (req, res) => {
    const token = req.headers.token.split(' ')[1]
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const img_url = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;
        const user = await UserModel.findOneAndUpdate({ _id: id }, {
            $set: {
                profilePicture: img_url
            }
        })
        if (!user) throw new Error('User Not Found')
        return res.status(200).json({ success: true, message: 'Profile Picture Uploaded' })
    } catch (error) {
        return res.status(400).json({ error: 'Internal Server Error' })
    }
}

module.exports.getUsers = async (req, res) => {
    try {
        let page = (req.query.page > 0) ? req.query.page : 1 || 1;
        let limit = req.query.limit || 10;
        let skip = (page - 1) * limit;
        let query = {};

        // Build filters
        if (req.query.email) {
            query.email = { $regex: req.query.email, $options: "i" };
        }
        if (req.query.firstname) {
            query['fullname.firstName'] = { $regex: req.query.firstname, $options: "i" };
        }
        if (req.query.lastname) {
            query['fullname.lastName'] = { $regex: req.query.lastname, $options: "i" };
        }

        const totalUsers = await UserModel.countDocuments(query);
        if (totalUsers < skip) {
            throw new Error("No users found");
        }

        const users = await UserModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });

        return res.status(200).json({ success: true, users, totalUsers });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};