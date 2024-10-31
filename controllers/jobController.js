import mongoose from "mongoose";
import JobSchema from "../models/JobSchema.js";

// Add jobs
export const createJobs = async (req, res) => {
  try {
    const { company, position, workLocation } = req.body;
    const userId = req.user.userId;
    req.body.createdBy = userId;
    // Position length
    if (position.length > 110)
      return res
        .status(400)
        .send({ messeage: "Position must be less than 110 characters" });

    const jobCreate = await JobSchema.create(req.body);
    res
      .status(201)
      .send({ message: "Job in portal added successfully", jobCreate });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Update jobs
export const updateJobs = async (req, res) => {
  try {
    const { company, position, workLocation } = req.body;
    if (!company || !position || !workLocation) {
      return res.status(401).send({
        success: false,
        message: "Please provide the company name position and work location",
      });
    }

    // Finding user
    const _id = req.params.id;

    const jobExist = await JobSchema.findOne({ _id });

    //  job is valid or not
    if (!jobExist) {
      res.status(401).send({
        success: false,
        message: "This type of jobs cannot exist",
      });
    }

    // Check user authourization
    if (req.user.userId !== jobExist.createdBy.toString()) {
      return res.status(401).send({
        success: false,
        message: `You are not authorized for this action`,
      });
    }

    const job = await JobSchema.findOneAndUpdate(
      { id }, // Find job by _id
      req.body, // Update with request body data
      { new: true, runValidators: true } // Options to return the updated document and run validators
    );

    res.status(200).send({
      success: true,
      message: "Job update successfully",
      job,
    });

    // Error
  } catch (error) {
    if (error && error.code === 11000) {
      return res
        .status(401)
        .send({ success: false, message: "cant find job ", error });
    }

    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

// Delete job
export const deleteJobs = async (req, res) => {
  try {
    // Finding user
    const _id = req.params.id;
    const jobExist = await JobSchema.findOne({ _id });

    //  job is valid or not
    if (!jobExist) {
      return res.status(404).send({
        success: false,
        message: "Job not Found!",
      });
    }

    // Check user authourization
    if (req.user.userId !== jobExist.createdBy.toString()) {
      return res.status(401).send({
        success: false,
        message: `You are not authorized for this action`,
      });
    }
    // Delete job

    await jobExist.deleteOne();

    res.status(200).send({
      success: true,
      message: "Job delete successfully",
      jobExist,
    });

    // Error
  } catch (error) {
    console.error("delete error ", error);

    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

// Stats aggregation
export const statsJob = async (req, res) => {
  try {
    const stats = await JobSchema.aggregate([
      // Search by users
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const statsOnMMYY = await JobSchema.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    //  Deafult stats
    const defaultStats = {
      pending: stats.pending || 0,
      reject: stats.rejct || 0,
      accept: stats.accept || 0,
      interview: stats.interview || 0,
    };

    res.status(201).send({
      success: true,
      message: "Jobs stats",
      totalJobs: stats.length,
      defaultStats,
      statsOnMMYY,
    });
    // Handling error
  } catch (error) {
    console.error(error);
    res.status(500).send({ succcess: false, message: "server error", error });
  }
};

// Status jobs
export const statusJob = async (req, res) => {
  try {
    // getting querry
    const { status, workType, position, sorting } = req.query;

    // Get user
    const query = {
      createdBy: req.user.userId,
    };

    // Check if status exits
    if (status && status != "all") {
      query.status = status;
    }

    // Check for work type
    if (workType && workType != "all") {
      query.workType = workType;
    }

    //Check for position
    if (position && position != "all") {
      query.position = { $regex: position, $options: "i" };
    }

    // Finding Jobs
    let jobQuery = JobSchema.find(query);

    // Sorting jobs
    if (sorting === "latest") {
      jobQuery = jobQuery.sort("-createdAt");
    } else if (sorting === "oldest") {
      jobQuery = jobQuery.sort("createdAt");
    }
    let queryResult = jobQuery;

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    queryResult = queryResult.skip(skip).limit(limit);

    // Counting jobs
    const jobsCount = await JobSchema.countDocuments(queryResult);
    const numOfPage = Math.ceil(jobsCount / limit);

    const jobs = await queryResult;
    return res.status(200).send({
      succcess: true,
      message: `Jobs found on  ${status} status and work type ${workType}`,
      jobs,
      jobsCount,
      numOfPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      succcess: false,
      message: "Server Error",
      error,
    });
  }
};
