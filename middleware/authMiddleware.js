import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  try {
    // Getting headers authenitication
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer"))
      return next("Authentication failed");

    // Split header

    const token = auth.split(" ")[1];
    //Verify token
    const authorized = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.user = { userId: authorized.userId };
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default authMiddleware;
