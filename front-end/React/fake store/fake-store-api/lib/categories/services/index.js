const models = require("../../../models")

const getCategories = async () => {
    const res = models.Category.findAll()
    return res
}



module.exports = {
    getCategories
}