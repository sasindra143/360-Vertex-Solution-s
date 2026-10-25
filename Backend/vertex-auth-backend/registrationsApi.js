const express = require("express");
const mongoose = require("mongoose");

const DATABASE_NAME = "vertex_notes";

const registrationSchema = new mongoose.Schema({
  full_name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254, unique: true },
  phone: { type: String, default: "", trim: true, maxlength: 32 },
}, {
  timestamps: { createdAt: "createdAt", updatedAt: false },
  collection: "websiteRegistrations",
});

function getRegistrationModel() {
  const connection = mongoose.connection.useDb(DATABASE_NAME, { useCache: true });
  return connection.models.WebsiteRegistration
    || connection.model("WebsiteRegistration", registrationSchema, "websiteRegistrations");
}

let databasePromise;

async function ensureRegistrationDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB is not configured. Set MONGODB_URI in the backend environment.");
  }
  if (mongoose.connection.readyState !== 1) {
    if (!databasePromise) {
      databasePromise = mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      }).catch((error) => {
        databasePromise = null;
        throw error;
      });
    }
    await databasePromise;
  }
}

class RegistrationInputError extends Error {}

function parseRegistrationInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new RegistrationInputError("Provide registration details.");
  }

  const full_name = typeof input.full_name === "string" ? input.full_name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";

  if (full_name.length < 2 || full_name.length > 120) {
    throw new RegistrationInputError("Full name must contain between 2 and 120 characters.");
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new RegistrationInputError("Enter a valid email address.");
  }
  if (phone.length > 32 || (phone && !/^[+()\d\s.-]+$/.test(phone))) {
    throw new RegistrationInputError("Enter a valid phone number.");
  }

  return { full_name, email, phone };
}

function createRegistrationRouters({
  getSessionFromRequest,
  rejectUnexpectedOrigin,
  ensureDatabase = ensureRegistrationDatabase,
  getModel = getRegistrationModel,
}) {
  const publicRouter = express.Router();
  const adminRouter = express.Router();

  publicRouter.post("/", async (req, res, next) => {
    if (rejectUnexpectedOrigin(req, res)) return;

    let registration;
    try {
      registration = parseRegistrationInput(req.body);
    } catch (error) {
      if (error instanceof RegistrationInputError) return res.status(400).json({ message: error.message });
      return next(error);
    }

    try {
      await ensureDatabase();
      const Registration = getModel();
      if (await Registration.findOne({ email: registration.email }).lean()) {
        return res.status(409).json({ message: "An account with this email address is already registered." });
      }

      const created = await Registration.create(registration);
      return res.status(201).json({
        registration: {
          id: String(created._id),
          full_name: created.full_name,
          email: created.email,
          phone: created.phone,
          created_at: created.createdAt,
        },
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "An account with this email address is already registered." });
      }
      return next(error);
    }
  });

  adminRouter.get("/", async (req, res, next) => {
    if (!getSessionFromRequest(req)) return res.status(401).json({ message: "Admin authentication required." });

    try {
      await ensureDatabase();
      const registrations = await getModel()
        .find({})
        .select("full_name email phone createdAt")
        .sort({ createdAt: -1 })
        .limit(500)
        .lean();
      return res.json({
        registrations: registrations.map((registration) => ({
          id: String(registration._id),
          full_name: registration.full_name,
          email: registration.email,
          phone: registration.phone,
          created_at: registration.createdAt,
        })),
      });
    } catch (error) {
      return next(error);
    }
  });

  return { publicRouter, adminRouter };
}

module.exports = {
  parseRegistrationInput,
  createRegistrationRouters,
};
