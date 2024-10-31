import express from "express";
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router();

router.post("/", authMiddleware, (req, res) => {
  res.send("Authenitcated");
});

export default router;
