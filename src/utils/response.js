
const errorResponse = (error) => {
    return {
        success: false,
        error: error.message
    }
}


const successResponse = (data, message) => {
    if (!message) {
        return {
            success: true,
            data: data,
        }
    } else {
        return {
            success: true,
            message: message,
            data: data,
        }
    }
}


module.exports = { errorResponse, successResponse }