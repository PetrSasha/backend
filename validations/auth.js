import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'invalid email').isEmail(),
    body('password', 'invalid password').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'invalid email').isEmail(),
    body('password', 'invalid password').isLength({min: 5}),
    body('fullName', 'invalid username').isLength({min: 3}),
    body('avatarUrl' ).optional().isURL()
]


export const postCreateValidation = [
    body('title', 'Enter post title').isLength({min: 3}).isString(),
    body('text', 'Enter text of the Post').isLength({min: 5}).isString(),
    body('tags', 'invalid tag format (array needed)').optional().isString(),
    body('imageUrl' , 'invalid image url' ).optional().isString()
]

