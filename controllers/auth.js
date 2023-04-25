const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const {handleHttpError} = require("../utils/handleError")
const {userModel} = require("../models")

/**
 * Encargado de registrar un nuevo usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password} // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        console.log(body);
        const dataUser = await userModel.create(body)
        //Si no queremos que se devuelva el hash con "findOne", en el modelo de users ponemos select: false en el campo password
        //Además, en este caso con "create", debemos setear la propiedad tal que:  
        dataUser.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)  
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}


/**
 * Encargado de hacer login del usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await userModel.findOne({ email: req.email }).select("password name role email")

        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        //Si no quisiera devolver el hash del password
        user.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send(data)

    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}


const updateUser = async (req,res)=>{
    try {
        const body = req.body
        
    
        id=req.user.id
        
        
        const user = await userModel.findOneAndUpdate(
           { _id: id },
            { $set: body },
            { new: true } // return the updated document
          );

        res.send(user)    
    }catch(err){
        //console.log(err) 
        handleHttpError(res, 'ERROR_UPDATE_USER')
    }
}

const deleteUser = async (req,res)=>{
    try {
        const body = req.body
        id=req.user.id
        
        const user = await userModel.findByIdAndDelete(id); // Buscamos y eliminamos el usuario en la base de datos
        if (!user) return res.status(404).send('Usuario no encontrado'); // Si no se encuentra el usuario, devolvemos un error
        res.send('Usuario eliminado correctamente'); // Enviamos una respuesta indicando que el usuario ha sido eliminado correctamente
  } catch (error) {
    console.error(error); // Manejamos cualquier error que ocurra durante la eliminación del usuario
    res.status(500).send('Ha ocurrido un error al eliminar el usuario');
    }
}

module.exports = { registerCtrl, loginCtrl,updateUser,deleteUser }