import cloudinary from "../../config/cloudinary.js";
import Restaurant from "../restaurant/restaurantModel.js";
import Menu from "./menuModel.js";

const handleError = (res, error, customMessage = "Server Error") => {
    console.error(error.message);
    res.status(500).json({ message: customMessage, error: error.message });
};

export const getMenu = async (req, res) => {
    try {
        const { id } = req.body;
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found", status: 0 });
        }
        res.status(200).json({ menu: restaurant.menu, message: "success", status: 1 });
    } catch (error) {
        handleError(res, error, "Error fetching menu");
    }
};

export const createMenu = async (req, res) => {
    try {
        const { name, image, description, price, restaurantId } = req.body;
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found", status: 0 });
        }

        const existingMenu = await Menu.findOne({ name });
        if (existingMenu) {
            return res.status(400).json({ message: "Menu Item already exists", status: 0 });
        }

        let imageObj = { url: "", cloudinary_id: "" };
        if (image) {
            const result = await cloudinary.uploader.upload(image);
            imageObj = { url: result.secure_url, cloudinary_id: result.public_id };
        }

        const newItem = new Menu({ name, price, image: imageObj, description });
        restaurant.menu.push(newItem);
        await restaurant.save();
        res.status(201).json({ message: "Menu Item created", status: 1 });
    } catch (error) {
        handleError(res, error, "Error creating menu item");
    }
};


export const updateMenu = async (req, res) => {
    const { name, price, description, image, id, restaurantId } = req.body;

    let imageObj = { url: "", cloudinary_id: "" };
    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found", status: 0 });
        }

        let menu = restaurant.menu.find((item) => item?._id == id);
        let menuIndex = restaurant.menu.findIndex((item) => item?._id == id);

        // let item = await Item.findById({ _id: id });
        if (!menu) {
            return res.status(404).json({ message: "Menu Item not found", status: 0 });
        }

        const data = {
            name,
            description,
            price,
        };
        if (image?.path && image?.cloudinary_id) {
            // Delete image from cloudinary
            await cloudinary.uploader.destroy(image?.cloudinary_id);

            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(image?.path);

            if (result) {
                imageObj.url = result.secure_url;
                imageObj.cloudinary_id = result.public_id;
            }
            data.image = imageObj;
        } else if (image?.path) {
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(image?.path);

            if (result) {
                imageObj.url = result.secure_url;
                imageObj.cloudinary_id = result.public_id;
            }
            data.image = imageObj;
        } else {
            data.image = menu.image;
        }

        restaurant.menu.splice(menuIndex, 1, data);

        await restaurant.save();

        res.status(200).json({ message: "Food Item Updated", status: 1 });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

export const deleteMenu = async (req, res) => {
    try {
        const { restaurantId, menuId } = req.body;
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found", status: 0 });
        }

        const menuIndex = restaurant.menu.findIndex((item) => item._id == menuId);
        if (menuIndex === -1) {
            return res.status(404).json({ message: "Menu Item not found", status: 0 });
        }

        const menuItem = restaurant.menu[menuIndex];
        if (menuItem?.image?.cloudinary_id) {
            await cloudinary.uploader.destroy(menuItem.image.cloudinary_id);
        }

        restaurant.menu.splice(menuIndex, 1);
        await restaurant.save();
        res.status(200).json({ message: "Menu Item removed", status: 1 });
    } catch (error) {
        handleError(res, error, "Error deleting menu item");
    }
};