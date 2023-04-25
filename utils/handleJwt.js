const jwt = require("jsonwebtoken")

/**
 * El objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "99999h"
        }
    )
    return sign
}



const tokenSign2 = async (commerce) => {
    const sign = jwt.sign(
        {
            _id: commerce._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "99999h"
        }
    )
    return sign
}

/**
 * Token se sesión
 * @param {*} tokenJwt 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, process.env.JWT_SECRET)
    }catch(err) {
        console.log(err)
    }
}

module.exports = { tokenSign, tokenSign2,verifyToken }