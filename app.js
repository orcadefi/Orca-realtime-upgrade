const express = require('express')              //cargamos express
const userRouter = require('./routers/user')    //cargamos routers/user
const port = process.env.PORT                   //cargamos el valor del puerto guadado en .env
require('./db/db')                              //db.js tien el acceso a nuestra base de datos

const app = express()                           // instanciamos express para poder enviar solicitudes al servidor get, post, delete, ....

app.use(express.json())                         // como construiremos un API los datos los recibiremos en formato JSON
app.use(userRouter)

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})
