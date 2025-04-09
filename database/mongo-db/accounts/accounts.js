const { ObjectId } = require('mongodb');
const connectToDatabase = require('../mongo');

const createUserAccount = async ({ sanitizedFirstName, sanitizedLastName, email, encryptedPassword }) => {
    try {
        const db = await connectToDatabase()
        const userCollection = db.collection('users')
        const result = await userCollection.insertOne({ firstName: sanitizedFirstName, lastName: sanitizedLastName, email, password: encryptedPassword })
        return { status: 200, message: 'User Created', _id: result.insertedId }
    } catch (err) {
        throw new Error('Error while creating user ' + err)
    }
}

const getUserByEmail = async (email) => {
    try {
        const db = await connectToDatabase()
        const usersCollection = db.collection('users')
        const existingUser = await usersCollection.findOne({ email })
        return existingUser
    } catch (err) {
        throw new Error('Error while Checking user' + err)
    }
}

const getUserBy_Id = async (id) => {
    try {
        const db = await connectToDatabase()
        const usersCollection = db.collection('users')
        const existingUser = await usersCollection.findOne({ _id: id })
        delete existingUser.password
        return existingUser
    } catch (err) {
        throw new Error('Error while Checking user ' + err)
    }
}

const logoutUser = async (id, token) => {
    try {
        const db = await connectToDatabase()
        const invalidTokensCollection = db.collection('invalidTokens')

        const response = await invalidTokensCollection.updateOne(
            { userId: id }, // 
            { $push: { tokens: token } }
        )

        if (response.modifiedCount === 0) {
            const invalidTokenObject = {
                userId: id,
                tokens: [token]
            }
            const result = await invalidTokensCollection.insertOne(invalidTokenObject)
            if (!result?.insertedId) {
                return false
            }
        }
        return true
    } catch (err) {
        throw new Error('Error while logging out. ' + err)
    }
}

const isTokenInvalidated = async (id, token) => {
    try {
        const db = await connectToDatabase()
        const invalidTokensCollection = db.collection('invalidTokens')
        const invalidatedToken = await invalidTokensCollection.findOne({ userId: id, tokens: { $in: [token] } })
        if (invalidatedToken) {
            return true
        }
        return false
    } catch (err) {
        throw new Error('Error while logging out. ' + err)
    }
}

const editAccountInfo = async (street, city, state, zip, phone, email) => {
    const db = await connectToDatabase()
    const usersCollection = db.collection('users')
    try {
        const filter = { email: email }; 
        if(street){
            const update = { $set: { street } }; 
            await usersCollection.updateOne(filter, update);
        }
        if(city){
            const update = { $set: { city } }; 
            await usersCollection.updateOne(filter, update);
        }
        if(state){
            const update = { $set: { state } }; 
            await usersCollection.updateOne(filter, update);
        }
        if(zip){
            const update = { $set: { zip } }; 
            await usersCollection.updateOne(filter, update);
        }
        if(phone){
            const update = { $set: { phone } }; 
            await usersCollection.updateOne(filter, update);
        }
        return { status: 200, message: 'User Updated' }
    } catch (error) {
        console.error('Error updating document:', error);
    } finally {
        await db.client.close();
    }
}


module.exports = {
    createUserAccount,
    getUserByEmail,
    getUserBy_Id,
    logoutUser,
    isTokenInvalidated,
    editAccountInfo
}