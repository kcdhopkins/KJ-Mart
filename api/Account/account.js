const express = require('express');
const router = express.Router();
const { createUserAccount, getUserByEmail, getUserBy_Id } = require('../../database/mongo-db/accounts/accounts')
const { encryptPassword, sanitizeUsername, verifyPassword, authUserToken }= require('../../functions/helperFunctions.js')
const jwt = require('jsonwebtoken')
const {signJWTWebToken} = require('../../functions/helperFunctions.js')
const {logoutUser} = require('../../database/mongo-db/accounts/accounts.js')
router.post('/sign-in', async (req, res) => {
    const {email, password } = req.body

    const trimmedEmail = email.trim()
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailFormat.test(trimmedEmail)
    
    if(!isValidEmail){
        res.send({status: 200, message: 'Invaild Email Format'})
        return
    }
  
    const userDBDetails = await getUserByEmail(email)

    if(!userDBDetails?._id){
        res.send({status: 200, message: "User doesn't exist"})
        return
    }
    
    const isValidPassword = verifyPassword(password, userDBDetails.password)

    if(!isValidPassword){
        res.send({status: 200, message:"Invalid password"})
        return
    }

    delete userDBDetails.password

    const token = signJWTWebToken(userDBDetails)

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production'? 'strict':'none',
        maxAge: 3600000 // 1 hour 
    });

    res.send(JSON.stringify({status: 200, loggedIn: true, user:userDBDetails, token}))

});

router.post('/create-account', async(req, res) => {
    const {firstName, lastName, email, password } = req.body
    const encryptedPassword = await encryptPassword(password)
    const sanitizedFirstName = sanitizeUsername(firstName.trim())
    const sanitizedLastName = sanitizeUsername(lastName.trim())
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailFormat.test(email)

    if(!sanitizedFirstName || !sanitizedLastName){
        res.send(JSON.stringify({status: 200, message: "Invalid entry for First or Last name"}));
        return
    }

    if(!isEmailValid){
        res.send(JSON.stringify({status: 200, message: "Invalid email"}));
        return
    }
    const doesUserExist = await getUserByEmail(email)
   
    if(doesUserExist){
        res.send(JSON.stringify({status: 200, message: "User exists"}));
        return
    }
    const result = await createUserAccount({sanitizedFirstName, sanitizedLastName, email, encryptedPassword})
 
    if(result._id){
        const user = await getUserBy_Id(result._id)
        delete user.password
        const token = signJWTWebToken(user)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod', 
            sameSite: process.env.NODE_ENV === 'prod'? 'strict':'none',
            maxAge: 3600000 // 1 hour 
        });

        res.send(JSON.stringify({status: 200, loggedIn: true, user:user, token, message: 'User Created'}))
        return
    }
});

router.get('/autoAuth', authUserToken, async (req, res)=>{
    const user = await getUserByEmail(req.user.email)
    delete user.password
    res.send(JSON.stringify({status: 200, loggedIn: true, user:user, token: req.token, message: 'Login Success'}))        
})

router.get('/logout', authUserToken, async (req, res)=>{
    const token = req.headers?.authorization && req.headers?.authorization.split(' ')[1] || req.cookies.token
    const { _id } = req.user
    const isUserLoggedOut = await logoutUser(_id, token)
    if(!isUserLoggedOut){
        res.send({status: 200, message: "Logout Failed"})
        return
    }
    res.send(JSON.stringify({status: 200, loggedIn: false, token:"", message: 'Logout Success'}))        
})

module.exports = router