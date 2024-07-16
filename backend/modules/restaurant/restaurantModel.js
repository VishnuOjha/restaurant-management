import mongoose from "mongoose";

export const ImageSchema = new mongoose.Schema({
    url: { type: String },
    cloudinary_id: { type: String },
});

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: ImageSchema,
    description: { type: String },
});

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    stars: { type: Number, enum: [1, 2, 3, 4, 5], default: 0 },
    cuisine: { type: String, required: true },
    services: { type: String, required:true },
    image: ImageSchema,
    description: { type: String, required: true },
    menu: [MenuSchema]
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
