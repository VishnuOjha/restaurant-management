import bcrypt from "bcryptjs";
import Admin from "../modules/admin/adminModel.js";

const initAdmin = async () => {
  try {

    // Check if an admin user already exists
    let adminUser = await Admin.findOne({
      email: process.env.INITIAL_ADMIN_EMAIL,
    });
    if (!adminUser) {
      // Create a new admin user
      const hashedPassword = await bcrypt.hash(
        process.env.INITIAL_ADMIN_PASSWORD,
        10
      );
      adminUser = new Admin({
        name: process.env.INITIAL_ADMIN_USERNAME,
        email: process.env.INITIAL_ADMIN_EMAIL,
        password: hashedPassword,
      });
      await adminUser.save();
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (err) {
    console.error("Error initializing admin user:", err);
  }

};

export default initAdmin;
