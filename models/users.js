const mongoose = require("mongoose")

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String,
            unique: true
        },
        password:{
            type: String  // TODO Guardaremos el hash
        },
        city:{
            type: String  // TODO Guardaremos el hash
        },
        oferts:{
            type: Boolean
        },
        Interest:{
            type: String
        },
        role:{
            type: ["user", "admin"], // es el enum de SQL
            default: "user"
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

module.exports = mongoose.model("users", UserScheme) // Nombre de la colección (o de la tabla en SQL)