const router = require('express').Router()
const {signUp, signIn, signInFB} = require('../controllers/user.controller')


router
    .post('/signup', signUp)
    .post('/signin', signIn)
    .post('/signinFB', signInFB,signIn)

module.exports = router
