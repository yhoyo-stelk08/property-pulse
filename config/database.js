import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    // if db connected, stop attempt to connect
    if(connected) {
        console.log('MongoDB is already connected');
        return;
    }

    // connect to mongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB failed to connect', error)
    }
}

export default connectDB;