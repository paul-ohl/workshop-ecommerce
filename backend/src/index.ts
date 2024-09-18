import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { getModelForClass } from "@typegoose/typegoose";
import GbaSPConfigModel, { GbaSPConfig } from "./models/gba-sp-config.model";
import { seedGbaModel } from "./seeding/gba-sp-config";

dotenv.config();

// Valider que les variables d'environnement sont présentes
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in the .env file");
}
if (!port) {
  throw new Error("PORT is not defined in the .env file");
}

const app: Express = express();
app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);  // Quitte l'application si la connexion échoue
  }
};

const startApp = async () => {
  await connectToDatabase();  // Connexion à MongoDB

  // SeedGbaModel if the db hasn't been seeded
  const config = await GbaSPConfigModel.find({})
  if (config.length === 0) {
    console.log("Seeding database.")
    seedGbaModel();
  }

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

startApp();
