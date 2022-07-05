import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import UserModel from '../models/User.js'

export const register = async (req, res) => {
    try{
       

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id,
        },'dvxx123',{expiresIn: '30d'}
        )

        const {passwordHash, ...userData} = user._doc

    res.json({...userData,token})
    }catch (err){
        console.log(err)
        res.status(500).json({
            message: "Can not register User"
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email:req.body.email})
        if(!user){
            return req.status(404).json(
                {
                message: 'User dose not exist'
            }
            )
        }

        const isValid = await bcrypt.compare( req.body.password , user._doc.passwordHash)

        if(!isValid){
            return res.status(403).json({
                message: ' wrong Password or UserName '
            })
        }

        const token = jwt.sign({_id: user._id,},'dvxx123',{expiresIn: '30d'})

        const {passwordHash, ...userData} = user._doc

    res.json({...userData,token})
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "auth faild "
        })
    }
}

export const getMe = async (req,res) => {
    try{
        const user = await UserModel.findById(req.userId)

        if(!user) {
            return res.status(404).json({
                message: 'missing this user'
            })
        }
        const {passwordHash, ...userData} = user._doc

        res.json(userData)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Access denied"
        })
    }
}