import {PreApproval} from "mercadopago";
import {connectDB} from "../../../../libs/mongodb"
import User from "../../../../modelos/user.model"
import Pago from "../../../../modelos/pagos.model"
import api, {mercadopago} from "@/api";


export async function POST(request: Request) {
  // Obtenemos el cuerpo de la petición que incluye el tipo de notificación
  const body: {email: string,planName:string,planPrice:number} = await request.json();

  const {url,id} = await api.user.suscribe(body.email,body.planPrice,body.planName);
//   console.log(body,{url})
  await connectDB()
  const user = await User.findOne({email:body.email})
//   console.log("user",user)
 const nuevoPago = await Pago.create({
    padoid:id,
    status:"pending",
    userId: user._id,
    planName:body.planName,
    planPrice:body.planPrice
 })
 user.pagos.unshift(nuevoPago._id);
 await user.save();
//  console.log("nuevoPago",nuevoPago)
  // Respondemos con un estado 200 para indicarle que la notificación fue recibida
  return new Response(JSON.stringify(url), {status: 200});
}