const { validateToken } = require("../services/auth")

function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        let tokenCookieValue = req.cookies[cookieName]
        if(!tokenCookieValue) return next()

        try {
                let user = validateToken(tokenCookieValue);
                req.user = user;
        } catch (error) {
            console.log(error);
        }
        next()
    }
}

module.exports = {
    checkForAuthenticationCookie
}