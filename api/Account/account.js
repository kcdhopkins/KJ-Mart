const express = require('express');
const router = express.Router();
const { createUserAccount, userExist } = require('../../database/mongo-db/accounts/accounts')
const { handleSignIn, encryptPassword, sanitizeUsername }= require('../../functions/helperFunctions.js')

router.post('/sign-in', async (req, res) => {
    const {username, password } = req.body
    const userInfo = await handleSignIn({username, password})
    res.send('sign in hit');
});

router.post('/create-account', async(req, res) => {
    const {firstName, lastName, email, password } = req.body
    const encryptedPassword = await encryptPassword(password)
    const sanitizedFirstName = sanitizeUsername(firstName)
    const sanitizedLastName = sanitizeUsername(lastName)
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailFormat.test(email)

    if(!isValid){
        res.send(JSON.stringify({status: 200, message: "Invalid email"}));
        return
    }
    const doesUserExist = await userExist(email)
   
    if(doesUserExist){
        res.send(JSON.stringify({status: 200, message: "User exists"}));
        return
    }
    const result = await createUserAccount({sanitizedFirstName, sanitizedLastName, email, encryptedPassword})
    res.send(JSON.stringify(result));
});

module.exports = router