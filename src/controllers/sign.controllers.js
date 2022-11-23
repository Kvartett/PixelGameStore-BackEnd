import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import { sessionsCollection, usersCollection } from "../database/db.js"
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

export async function signIn(req, res) {
    const { email, password } = req.body

    try {
        const userExist = await usersCollection.findOne({ email: email })

        if (userExist && bcrypt.compareSync(password, userExist.password)) {
            const token = uuid()

            await sessionsCollection.insertOne({ token, email })
            res.status(200).send({ username: userExist.username, email: userExist.email, image: userExist.image, token })
        } else {
            res.status(500).send("Usuario não encontrado! E-mail ou senha incorretos.")
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}