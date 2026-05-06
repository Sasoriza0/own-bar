import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcryptjs' 


import ApiError from '../error/apiError.js'; 
import User from '../models/User.js';


export const register = async (req, res, next) => {
    try {

        const existingUser = await User.findOne({email: req.body.email})

        if (existingUser) {
            return next(ApiError.badRequest('this email is already in use'))
        }

        const {password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: hash
        })

        const user = await doc.save()
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: '7d'})

        const {passwordHash, ...userData} = user._doc

        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict'
        })
        
        res.json({
            ...userData,
            message: 'successfully'
        })
    } catch (err) {
        console.log(err)
        next(ApiError.internal('internal error'))
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return next(ApiError.badRequest('invalid password or email')) 
        }

        const  {password} = req.body
        const isPasswordValid = await bcrypt.compare(password, user._doc.passwordHash)
        if (!isPasswordValid) {
            return next(ApiError.badRequest('invalid password or email')) 
        }

        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: '7d'})

        const {passwordHash, ...userData} = user._doc
        
        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict'
        })
        
        res.json({
            ...userData,
            message: 'successfully'
        })
    } catch (err) {
        console.log(err)
        next(ApiError.internal('internal error'))
    }
};
