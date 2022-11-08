import { body } from 'express-validator'

// USER

export const loginValidation = [
  body('email', 'wrong email').isEmail(),
  body('password', 'wrong password').isLength({ min: 5 }),
]

export const registerValidation = [
  body('email', 'invalid email').isEmail(),
  body('password', 'invalid password').isLength({ min: 5 }),
  body('fullName', 'please enter an existing name').isLength({ min: 3 }),
  body('avatarUrl', 'invalid url of image').optional().isURL(),
]

// POST

export const postCreateValidation = [
  body('title', 'write title').isLength({ min: 3 }).isString(),
  body('text', 'write text').isLength({ min: 5 }).isString(),
  body('tags', 'ivalid format tags').optional().isArray(),
  body('imageUrl', 'invalid url of image').optional().isURL(),
]

export const postUpdateValidation = [
  body('title', 'write title').isLength({ min: 3 }).isString(),
  body('text', 'write text').isLength({ min: 5 }).isString(),
  body('tags', 'ivalid format tags').optional().isArray(),
  body('imageUrl', 'invalid url of image').optional().isURL(),
]
