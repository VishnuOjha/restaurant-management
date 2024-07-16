import mongoose from "mongoose";
import { ImageSchema } from "../restaurant/restaurantModel.js";

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: ImageSchema,
    description: { type: String },
});

const Menu = mongoose.model("Menu", MenuSchema);

export default Menu;
