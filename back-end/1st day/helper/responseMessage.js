const successResponse = (messages = '', data = [], extras = {}) => {
    var response = {
        success: true,
        messages,
        data ,
        time: Date.now(),
    }
    response = {...response, ...extras}
    return response
}

const errorResponse = (messages = '', data = []) => {
    var response = {
        success: false,
        messages, 
        data,
        time: Date.now()
    }
    return response
}

module.exports = {
    successResponse,
    errorResponse
}