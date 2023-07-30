const HttpError = (status, massage)=>{
    const error = new Error(massage)
    Error.status = status
    return error;
}

module.exports={
    HttpError
}
