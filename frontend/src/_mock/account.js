// ----------------------------------------------------------------------

import { getItemFromStorage } from "../utils/common";
import userPic from "../assets/images/avatars/avatar_25.jpg";

const email = getItemFromStorage("user");
export const account = {
  displayName: "Admin",
  email: email,
  photoURL: userPic,
};
