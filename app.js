const express = require("express")
const cors = require("cors")
const dbConnect = require("./config/mongo")
const loggerStream=require("./utils/handleLogin")
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")
const { IncomingWebhook } = require("@slack/webhook");
require("dotenv").config();
const morganBody=require("morgan-body")
const app = express()

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors()) 
app.use(express.json())

//Le digo que directorio es publico
app.use(express.static("storage")) // http://localhost:3000/file.jpg

//slack para compartir los logs

morganBody(app,{
    noColor:true,
    skip: function(req,res){
        return res.statusCode <400
    },
    stream:loggerStream
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.use("/api", require("./routes")) //Lee routes/index.js por defecto

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
    dbConnect();
})
module.exports = app



