import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        telegramid: {
            type: String,
            unique: true,
            index: true
        },
        whatsappid: {
            type: String,
            unique: true,
            index: true
        },
        email: {
            type: String,
            unique: true,
            index: true
        },
        nick: {
            type: String,
            required: false
        },
        filtros: {
            
                provincia:{type :String,required:false,default:""},
                zonas:[{type :String,required:false}],
                // baños:{type :String,required:false,default:"No importa"},
                // habitaciones:{type :String,required:false,default:"No importa"},
                ambientes:{type :String,required:false,default:"No Importa"},
                inmueble:[{type :String,required:false,default:"Departamentos"}],
                alquiler:{type :String,required:false,default:"anual"}
            
        },        
        plan: {
            type: String
        },
        pagos: [{
            type: mongoose.Schema.Types.ObjectId, // Relacionar con el ObjectId del usuario
            ref: "Pago", // Referencia al modelo "User"
        }],
        vencimiento: {
            type: Date
        },
        provincia: {
            type: String
        },
        ciudad: {
            type: String
        },
        otp: {
            type: String
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;