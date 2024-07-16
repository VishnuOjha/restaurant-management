import cloudinary from "../../config/cloudinary.js";
import Restaurant from "./restaurantModel.js";

const handleError = (res, error, customMessage = "Server Error") => {
  console.error(error.message);
  res.status(500).json({ message: customMessage, error: error.message, status: 0 });
};

const uploadImage = async (image) => {
  if (!image) return { url: "", cloudinary_id: "" };
  const result = await cloudinary.uploader.upload(image);
  return { url: result.secure_url, cloudinary_id: result.public_id };
};

export const createRestaurant = async (req, res) => {
  try {
    const { name, location, stars, cuisine, services, image, description } = req.body;
    const imageObj = await uploadImage(image);
    const restaurant = new Restaurant({
      name, location, stars, cuisine, services,
      image: imageObj, description, menu: []
    });
    await restaurant.save();
    res.status(201).json({ message: "Restaurant created", status: 1 });
  } catch (error) {
    handleError(res, error, "Error creating restaurant");
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({ message: "success", restaurants, status: 1 });
  } catch (error) {
    handleError(res, error, "Error fetching restaurants");
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.body;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found", status: 0 });
    }
    res.status(200).json({ restaurant, status: 1 });
  } catch (error) {
    handleError(res, error, "Error fetching restaurant");
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { name, description, location, stars, cuisine, services, image, id } = req.body;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found", status: 0 });
    }

    const data = { name, description, location, stars, cuisine, services };

    if (image?.path) {
      if (restaurant.image?.cloudinary_id) {
        await cloudinary.uploader.destroy(restaurant.image.cloudinary_id);
      }
      data.image = await uploadImage(image.path);
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({ message: "Restaurant Updated", restaurant: updatedRestaurant, status: 1 });
  } catch (error) {
    handleError(res, error, "Error updating restaurant");
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found", status: 0 });
    }
    if (restaurant.image?.cloudinary_id) {
      await cloudinary.uploader.destroy(restaurant.image.cloudinary_id);
    }
    await Restaurant.findByIdAndDelete(restaurantId);
    res.status(200).json({ message: "Restaurant removed", status: 1 });
  } catch (error) {
    handleError(res, error, "Error deleting restaurant");
  }
};