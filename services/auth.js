const JWT = require("jsonwebtoken")
const secret = "#BhargavMaru@33"

function createTokenForUser(user){
    const payload = {
        _id : user._id,
        email:user.email,
        profileImage:user.profileImage,
        role:user.role,
        fullName:user.fullName
    }

    const token = JWT.sign(payload,secret)
    console.log(token);
    return token
}

function validateToken(token){
    let payload = JWT.verify(token,secret)
    return payload
}

module.exports = {
    createTokenForUser,
    validateToken
}