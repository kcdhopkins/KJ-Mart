const connectToDatabase = require('../mongo');

const createUserAccount = async ({sanitizedFirstName, sanitizedLastName, email, encryptedPassword})=>{
    try{
        const db = await connectToDatabase()
        const userCollection = db.collection('users')
        const result = await userCollection.insertOne({firstName: sanitizedFirstName, lastName: sanitizedLastName, email, password: encryptedPassword})
        return {status: 200, message: 'User Created'}
    } catch (err){
        throw new Error('Error while creating user')
    }
}

const userExist = async (email)=>{
    try{
        const db = await connectToDatabase()
        const usersCollection = db.collection('users')
        const existingUser = await usersCollection.findOne({ email })
        if(existingUser?._id){
            return true
        }
        return false
    } catch (err){
        throw new Error('Error while Checking user')
    }
}

module.exports = {
    createUserAccount,
    userExist
}