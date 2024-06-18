const languageModel = require('../models/languageModels')

cgit 
const getLanguages =async  (req, res) =>{
    try {
        const languages = await languageModel.find()
        res.status(200).json({success:true, data:languages})
        
    } catch (error) {
        res.status(500).json({success:false, message:"An error occurred while fetching languages"})
    }

}


module.exports = {getLanguages}