const mongoose = require('mongoose')            //paquetes requeridos
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
mongoose.set('useFindAndModify', false);

const userSchema = mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        required: false,
        trim: true
    },
    premium: {
        type: Boolean,
        required: false,
        trim: true
    },
    registerDate: { type: Date, default: Date.now },
    date: {
        day:{
            type: Number,
            required: false
        },
        month:{
            type: Number,
            required: false
        },
        year:{
            type: Number,
            required: false
        },

    },
    }],
})

/*userSchema.pre('save', async function (next) {                      // nos permite hacer algo antes de guardar el objeto creado
    // Encriptar el password antes de guardarlo en el model user
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)         //usamos bcrypt para encriptar la contraseña
    }                                                               // asegurarnos de que solo usemos hash de la contraseña si se modifica
    next()                                                          //  y es por eso que primero tenemos que verificar si la contraseña se modificó.
})*/

/*userSchema.methods.generateAuthToken = async function() {
    // Generar un método de autenticación para el usuario
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)    //Este método utiliza el JWT para firmar el método para crear un token. El método firmado espera los datos que se utilizarán para firmar el token y una clave JWT que puede ser una cadena aleatoria. Para nuestro caso, definimos uno en el archivo .env y lo llamamos JWT_KEY.
    user.tokens = user.tokens.concat({token})                       //Una vez creado el token, lo agregamos a la lista de tokens del usuario
    await user.save()                                               //guardamos
    return token                                                    //devolvemos el token
}*/

userSchema.statics.findByAddress = async (address) => { //espera dos parámetros, el correo electrónico del usuario y la contraseña
    // Buscar el susuario por email y password.
    const user = await User.findOne({address} )                     ////buscamos un usuario con el correo electrónico proporcionado utilizando el método de búsqueda de mongoose
    if (!user) {                                                            //Si el usuario no está disponible, arrojamos un error para informarle
        throw new Error({ error: 'Credenciales de login inválidas' })       //que las credenciales que proporcionó no son válidas
    }
/*    const isPasswordMatch = await bcrypt.compare(password, user.password)   //comparamos la contraseña recibida con la contraseña almacenada y si coinciden, devolvemos ese usuario. Utilizaremos esta función para registrar a los usuarios en la aplicación.
    if (!isPasswordMatch) {
        throw new Error({ error: 'Credenciales de login inválidas' })
    }*/
    return user
}

const User = mongoose.model('User', userSchema)                             //creamos un modelo llamado Usuario y le pasamos nuestro esquema de usuario creado

module.exports = User                                                       //exportamos el módulo para que pueda reutilizarse en otros archivos.
