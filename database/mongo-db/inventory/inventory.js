const { ObjectId } = require('mongodb');
const connectToDatabase = require('../mongo');

const getSearchTermInventory = async (searchTerm) => {
    try {
        const db = await connectToDatabase();
        const inventoryCollection = db.collection('inventory');

        const result = await inventoryCollection.find({ searchTags: { $in: [searchTerm] } }).toArray();

        return { status: 200, message: 'Success', data: result };
    } catch (err) {
        throw new Error('Error while searching inventory: ' + err);
    }
};

module.exports = {
    getSearchTermInventory
}