import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected',() => {
        console.log(`Connected to database: ${ mongoose.connection.name }`);
    })

    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'e-commerce' });

}

export default connectDB;