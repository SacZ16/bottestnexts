import fs from "node:fs";

import {MercadoPagoConfig, PreApproval} from "mercadopago";
import { connectDB } from "./libs/mongodb";
import User from "./modelos/user.model";

interface Message {
  id: number;
  text: string;
}

interface User {
  id: number;
  name: string;
  suscription: string | null;
  email: string;
}

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const api = {
  user: {
    async suscribe(email: string) {
      const suscription = await new PreApproval(mercadopago).create({
        body: {
          back_url: process.env.APP_URL!,
          reason: "Suscripción a plan",
          auto_recurring: {
            frequency: 1,
            frequency_type: "months",
            transaction_amount: 100,
            currency_id: "ARS",
          },
          payer_email: email,
          status: "pending",
        },
      });
      // await connectDB()
      // const user = await User.findOneAndUpdate(
      //   { email:"test@gmail.com" }, // Filtro para buscar por el email
      //   { $push: { pagos: suscription.id } }, // Agrega el nuevo ID al array 'pagos'
      //   { new: true } // Devuelve el documento actualizado después de aplicar los cambios
      // )
      console.log("sadasdasdsadasdas",suscription.id)
      return {url:suscription.init_point,id:suscription.id}!;
    },
    // async fetch(): Promise<User> {
    //   const user = fs.readFileSync("db/user.db", "utf-8");

    //   return JSON.parse(user);
    // },
    // async update(data: Partial<User>) {
    //   const user = await api.user.fetch();

    //   fs.writeFileSync("db/user.db", JSON.stringify({...user, ...data}));
    // },
  },
  // message: {
  //   async add(message: string) {
  //     const messages = await api.message.list();

  //     messages.push({
  //       id: messages.length + 1,
  //       text: message,
  //     });

  //     fs.writeFileSync("db/message.db", JSON.stringify(messages));
  //   },
  //   async list(): Promise<Message[]> {
  //     const messages = fs.readFileSync("db/message.db", "utf-8");

  //     return JSON.parse(messages);
  //   },
  // },
};

export default api;
