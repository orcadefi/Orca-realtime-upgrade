const mongoose = require('mongoose')            //para conectarnos a una base de datos mongoose

mongoose.connect(process.env.MONGODB_URL, {     //nos conectamos y enviamos dos parámetros la URL de la base de datos
    useNewUrlParser: true,                      //se envia useNewUrlParser y useCreateIndex para evitar mensajes en la consola
    useCreateIndex: true,                       //para evitar las advertencias de deprecaciones
    useUnifiedTopology: true
})
