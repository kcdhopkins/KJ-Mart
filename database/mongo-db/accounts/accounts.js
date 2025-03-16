const { ObjectId } = require('mongodb');
const connectToDatabase = require('../mongo');

const createUserAccount = async ({sanitizedFirstName, sanitizedLastName, email, encryptedPassword})=>{
    try{
        const db = await connectToDatabase()
        const userCollection = db.collection('users')
        const result = await userCollection.insertOne({firstName: sanitizedFirstName, lastName: sanitizedLastName, email, password: encryptedPassword})
        return {status: 200, message: 'User Created', _id:result.insertedId}
    } catch (err){
        throw new Error('Error while creating user ' + err)
    }
}

const getUserByEmail = async (email)=>{
    try{
        const db = await connectToDatabase()
        const usersCollection = db.collection('users')
        const existingUser = await usersCollection.findOne({email})
        delete existingUser?.password
        return existingUser
    } catch (err){
        throw new Error('Error while Checking user' + err)
    }
}

const getUserBy_Id = async (id)=>{
    
    try{
        const db = await connectToDatabase()
        const usersCollection = db.collection('users')
        const existingUser = await usersCollection.findOne({_id: new ObjectId(id)})
        delete existingUser.password
        return existingUser
    } catch (err){
        throw new Error('Error while Checking user ' + err)
    }
}

module.exports = {
    createUserAccount,
    getUserByEmail,
    getUserBy_Id
}