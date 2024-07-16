import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  let info = null;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      info = null;
    } else {
      // Add the decoded user information to the request object
      info = decoded?.user?.id;
    }
  });
  return info;
};
