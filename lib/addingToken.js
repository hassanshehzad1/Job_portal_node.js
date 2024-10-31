import jwt from "jsonwebtoken";
const addingToken = (email, userId) => {
  const JSONSECRETKEY = process.env.TOKEN_SECRET_KEY;
  const token = jwt.sign({ email: email, userId: userId }, `${JSONSECRETKEY}`);
  return token;
};
export default addingToken;
