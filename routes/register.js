import express from "express";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
const router = express.Router();



// Swagger code is generated and helped by GPT
// Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - username
 *         - password
 *         - age
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user collection
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email address
 *         username:
 *           type: string
 *           description: Username
 *         password:
 *           type: string
 *           description: User password, must be greater than 8 characters
 *         age:
 *           type: number
 *           description: User age
 *         location:
 *           type: string
 *           description: User location
 *       example:
 *         id: JLDSJJDKSL3842374932JKSK
 *         name: test
 *         email: test@gmail.com
 *         username: testes
 *         password: test@1234
 *         age: 18
 *         location: lahore
 */

// Display
/**
 *  @swagger
 *  tags:
 *     name: Register
 *     description: Register User api
 */

// Posts
// Posts
/**
 *  @swagger
 *  /api/v1/register:
 *    post:
 *      summary: Register a new user
 *      tags:
 *        - auth
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: User registered successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: User registered successfully
 *                  userId:
 *                    type: string
 *                    example: "JLDSJJDKSL3842374932JKSK"
 *        400:
 *          description: Invalid input, object invalid
 *        500:
 *          description: Internal server error
 */

// LOGIN
// Swagger Documentation for Login
/**
 * @swagger
 *  /api/v1/login:
 *    post:
 *      summary: Log in an existing user
 *      tags:
 *        - auth
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The user's username
 *                  example: testes
 *                password:
 *                  type: string
 *                  description: The user's password
 *                  example: test@1234
 *      responses:
 *        200:
 *          description: Login successful
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Login successful
 *                  token:
 *                    type: string
 *                    description: JWT token for accessing protected routes
 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *        400:
 *          description: Invalid credentials
 *        500:
 *          description: Internal server error
 */

router.post("/register", register);
router.post("/login", login);
export default router;
