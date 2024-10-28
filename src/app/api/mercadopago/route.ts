import {PreApproval} from "mercadopago";
import {connectDB} from "../../../libs/mongodb"
import User from "../../../modelos/user.model"
import api, {mercadopago} from "@/api";
import Pago from "@/modelos/pagos.model";

// export async function GET(request:Request) {
//   await connectDB()
//   const user = await User.findOne({
//     pagos: "f59ade25b10e4bc887b8e2a4b8d0f5ef" // Busca un usuario donde 'pagos' contenga 'pagoId'
//   });
//   return new Response(JSON.stringify({ user }),{status:200})
// }
export async function POST(request: Request) {
  // Obtenemos el cuerpo de la petición que incluye el tipo de notificación
  const body: {data: {id: string}} = await request.json();

  // Obtenemos la suscripción
  const preapproval = await new PreApproval(mercadopago).get({id: body.data.id});

  // Si se aprueba, actualizamos el usuario con el id de la suscripción
  await connectDB()
  const pagos = await Pago.findOneAndUpdate({padoid:preapproval.id},{status:preapproval.status})
  if (preapproval.status === "authorized") {
    // Actualizamos el usuario con el id de la suscripción
    // await api.user.update({suscription: preapproval.id});
    console.log("suscrition status:",preapproval.status)
  }
  console.log("suscrition status:",preapproval.status)
  // console.log("aprobado!!3",preapproval)

  // Respondemos con un estado 200 para indicarle que la notificación fue recibida
  return new Response(null, {status: 200});
}
