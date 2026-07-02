import mongoose from "mongoose"

const DB_URl = process.env.DB_URl;

export const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(DB_URl);
        console.log(`Conexión exitosa a la BD. Host: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}