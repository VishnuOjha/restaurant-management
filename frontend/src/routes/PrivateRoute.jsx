import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getItemFromStorage } from "../utils/common";

const PrivateRoutes = () => {

  const currentUser = getItemFromStorage("user");

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
