import express,{Request , Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import myUserRoute from "./routes/MyUserRoute"
import { v2 as cloudinary } from "cloudinary"
import myRestaurantRoute from "./routes/MyRestaurantRoute"
import RestaunrantRoute from "./routes/RestaurantRoute"
import orderRoute from "./routes/OrderRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());

app.use("/api/order/checkout/webhook",express.raw({ type : "*/*" }));

app.use(express.json());

app.get("/health",async (req: Request, res: Response)=>{
  res.send({message : "health OK!"});
})

app.use("/api/my/user",myUserRoute);
app.use("/api/my/restaurant",myRestaurantRoute);
app.use("/api/restaurant",RestaunrantRoute);
app.use("/api/order", orderRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
}
);