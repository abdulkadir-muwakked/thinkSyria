const responses = require("../../helper/responses")
const servies = require("../services")
const transformers = require("../../transformers")

const getCategories = async (req, res, next) => {
    try {
        const categories = await servies.getCategories();
        if(categories) return responses.successWithMessage("Get all Categories successfully",res, transformers.categoryTeransfromers(categories))
        return responses.failedWithMessage("failed to get  all Categories",res)
    } catch (err) {
        console.log("ERROR--> ", err)
        return responses.serverError(res)
    }
}



module.exports = {
    getCategories 
}