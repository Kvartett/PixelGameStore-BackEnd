import bcrypt from "bcrypt"
import { usersCollection } from "../database/db.js"
import { userSchema } from "../models/user.model.js"

export async function signUp(req, res) {
    const { email, password, username, image } = req.body

    const { error } = userSchema.validate({ email, password, username, image }, { abortEarly: false })

    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }

    try {
        const userExist = await usersCollection.findOne({ email: email })

        if (userExist) {
            return res.status(409).send("E-mail ja cadastrado!")
        }
        const passwordHash = bcrypt.hashSync(password, 12)
        await usersCollection.insertOne({ email, password: passwordHash, username, image })
        res.status(201).send("Usuario cadastrado!")

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}