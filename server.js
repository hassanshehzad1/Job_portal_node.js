// API documentation
import swaggerUiXxpress from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// Importing modules
import express from "express";
import "express-async-errors";
import cors from "cors";
// Setting config env
import dotEnv from "dotenv";
dotEnv.config({ path: "./config/config.env" });
import morgan from "morgan";
import CookieParser from "cookie-parser";

// Security file
import helmet from "helmet";
import expressMongoSanitize from "express-mongo-sanitize";

// Importing files
import register from "./routes/register.js";
import errMiddleWare from "./middleware/errMiddleWare.js";
import test from "./routes/test.js";
import updateUser from "./routes/updateUser.js";
import jobRoute from "./routes/jobRoute.js";

// Connect with dbs
import connectWithDbs from "./db/conn.js";

connectWithDbs();

// Swagger api config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal App",
      description: "Node.js Express.js and MongoDB app",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specif = swaggerJsDoc(options);

// Rest object
const app = express();

// Security middleWares
app.use(helmet());
app.use(expressMongoSanitize());

// Using middle wares
app.use(CookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(errMiddleWare);
// expess
app.use("/api/v1", register);

app.use("/api/v1/test", test);
app.use("/api/v1/updateUser", updateUser);
app.use("/api/v1/job", jobRoute);

// Api route root
app.use("/api-doc", swaggerUiXxpress.serve, swaggerUiXxpress.setup(specif));

const PORT = process.env.PORT || 3000;

// Listening
app.listen(PORT, () =>
  console.log(
    `Your app in ${process.env.DEV_MODE} mode is running on PORT ${PORT}`
  )
);
