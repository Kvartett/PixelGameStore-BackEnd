import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)

try {
    await mongoClient.connect()
    console.log("MongoDB connected")
} catch (err) {
    console.log(err)
}

const db = mongoClient.db("pixelgamestore")
export const usersCollection = db.collection("users")
export const gamesCollection = db.collection("games")
export const sessionsCollection = db.collection("sessions")