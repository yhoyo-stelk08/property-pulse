import connectDB from "@/config/database";
import Property from "@/models/Property";


// GET /api/search/?queryParams
export const GET = async (request) => {
    // connect to database
    await connectDB();
}