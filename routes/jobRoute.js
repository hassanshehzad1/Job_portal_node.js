import express from "express";
const router = express.Router();
import {
  createJobs,
  updateJobs,
  deleteJobs,
  statsJob,
  statusJob,
} from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/create-job", authMiddleware, createJobs);

// Put || patch
router.patch("/update-job/:id", authMiddleware, updateJobs);

// Delete
router.delete("/delete-job/:id", authMiddleware, deleteJobs);

// Stats
router.get("/stats-job", authMiddleware, statsJob);

// Stats
router.get("/status-job/", authMiddleware, statusJob);
export default router;

// Swagger code is generated by gpt
// Swagger Documentation

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Job title
 *         description:
 *           type: string
 *           description: Job description
 *         company:
 *           type: string
 *           description: Company name
 *         location:
 *           type: string
 *           description: Job location
 *       example:
 *         title: Software Engineer
 *         description: Responsible for developing software solutions.
 *         company: OpenAI
 *         location: Remote
 */

/**
 * @swagger
 * tags:
 *   - name: Jobs
 *     description: Job management APIs
 */

/**
 * @swagger
 * /api/v1/create-job:
 *   post:
 *     summary: Create a new job
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/update-job/{id}:
 *   patch:
 *     summary: Update an existing job
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/delete-job/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/stats-job:
 *   get:
 *     summary: Get job statistics
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/status-job:
 *   get:
 *     summary: Get job statuses
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job statuses retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */