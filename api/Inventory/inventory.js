const express = require('express');
const { sanitizeInput } = require('../../functions/helperFunctions');
const { getSearchTermInventory } = require('../../database/mongo-db/inventory/inventory');
const router = express.Router();

router.post('/search', async (req, res)=>{
    const trimmedTerm = req.body.searchTerm.trim()
    const safeTerm = sanitizeInput(trimmedTerm)
    const searchTerm = safeTerm.toLowerCase()

    if(!searchTerm){
        res.send(JSON.stringify({status: 200, message: "Invalid search term"}))
        return
    }
    
    const result = await getSearchTermInventory(searchTerm)
    
    res.send(JSON.stringify(result))        
})

module.exports = router