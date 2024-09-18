import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

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

// Fonction pour se connecter à MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);  // Quitte l'application si la connexion échoue
  }
};

// Définition du modèle d'utilisateur
const mongSchema = new mongoose.Schema({
  nom: String,
  email: String,
  age: Number,
});

const Mong = mongoose.model('Mong', mongSchema);

// Fonction pour ajouter un utilisateur
async function addMong(mongData: { nom: string; email: string; age: number }) {
  try {
    const mong = new Mong(mongData);
    const savedMong = await mong.save();
    console.log('Utilisateur ajouté avec succès:', savedMong);
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
  }
}

// Fonction pour récupérer et afficher tous les utilisateurs
async function getAllMongs() {
  try {
    const mongs = await Mong.find();  // Récupère tous les utilisateurs
    console.log('Liste des utilisateurs :', mongs);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs:', err);
  }
}

// Exemple d'utilisateur à ajouter
const nouvelUtilisateur = {
  nom: 'Jean3',
  email: '3jean@example.com',
  age: 30
};

// Connexion à MongoDB et ajout de l'utilisateur après la connexion
const startApp = async () => {
  await connectToDatabase();  // Connexion à MongoDB
  await addMong(nouvelUtilisateur);  // Ajout de l'utilisateur après la connexion
  await getAllMongs();  // Affiche tous les utilisateurs après l'ajout

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

// Démarrer l'application
startApp();
