import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(()=>{
        console.log("======DB connection successful======")
    })

    mongoose.connection.onOpen('open', () => {
    })
  
  } catch (e) {
    console.log('Algo como error',e);
  }
}