import Resource from "../models/resource.model.js";
import { errorHandler } from "../utils/error.js";

import fetch from "node-fetch";
import { pipeline } from "stream/promises";

import User from "../models/user.model.js";

export const uploadResource = async (req, res, next) => {
  try {
    const {
      resourceUserId,
      resourceName,
      resourceSize,
      uploadedBy,
      resourceDescription,
      resourceType,
      url,
    } = req.body;

    // Check if the user exists
    const user = await User.findById(resourceUserId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is not an admin and is uploading a resource for another user
    if (req.user.role !== "admin" && req.user.id != resourceUserId) {
      return res.status(401).json("Unauthorized to upload resource for another user");
    }

    const resource = new Resource({
      resourceUserId,
      resourceName,
      resourceSize,
      uploadedBy,
      resourceDescription,
      resourceType,
      url,
    });

    await resource.save();
    return res.status(201).json("Successfully uploaded the resource");
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const readResource = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const resources = await Resource.find({
      resourceUserId: userId,
    });

    return res.status(200).json(resources);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const deleteResource = async (req, res, next) => {
  if (req.user.role != "admin") {
    return res.status(401).json("Only admin can delete resources");
  } else {
    try {
      await Resource.findByIdAndDelete(req.params.id);
      return res.status(201).json("Successfully deleted the resource");
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  }
};

export const updateResource = async (req, res, next) => {
  if (req.user.role != "admin")
    return res.status(401).json("Only admin can update a resource");

  try {
    const id = req.params.id;
    const {
      resourceName,
      resourceSize,
      uploadedBy,
      resourceDescription,
      resourceType,
      url,
    } = req.body;

    const updatedResource = await Resource.findByIdAndUpdate(id, {
      resourceName,
      resourceSize,
      uploadedBy,
      resourceDescription,
      resourceType,
      url,
    });

    if (!updatedResource) {
      return next(errorHandler(404, "Resource not found"));
    }

    return res.status(200).json("Resource updated");
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const downloadResource = async (req, res, next) => {
  const resourceId = req.params.resourceId;

  try {
    const resource = await Resource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Check if the user is authorized to download the resource
    if (req.user.role !== "admin" && req.user._id != resource.resourceUserId) {
      return res.status(401).json("Unauthorized to download the resource");
    }

    const resourceUrl = resource.url;

    const response = await fetch(resourceUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch resource: ${response.statusText}`);
    }

    let contentType = "application/octet-stream";

    if (resource.resourceType === "pdf") {
      contentType = "application/pdf";
    } else if (resource.resourceType === "docx") {
      contentType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${resource.resourceName}"`
    );
    res.setHeader("Content-Type", contentType);

    await pipeline(response.body, res);
  } catch (error) {
    console.error("Error downloading resource:", error.message);
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json("Only admin can fetch all users");
  }

  // Return all users in the database who are not admins
  try {
    const users = await User.find(
      { role: { $ne: "admin" }, isVerified: "YES" },
      "username fullname role email avatar"
    );
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    next(errorHandler(500, error.message));
  }
};
