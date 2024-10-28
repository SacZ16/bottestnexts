import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema(
    {
        padoid:{
            type:String
        },
        status:{
            type:String
        },
        planName:{
            type:String
        },
        planPrice:{
            type:Number
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, // Relacionar con el ObjectId del usuario
            ref: "User", // Referencia al modelo "User"
            required: true, // Hacer que el campo sea obligatorio
            index: true
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps: true,
    }
);

// export default mongoose.model("Pago", pagoSchema);
const Pago = mongoose.models.Pago || mongoose.model("Pago", pagoSchema);
export default Pago;