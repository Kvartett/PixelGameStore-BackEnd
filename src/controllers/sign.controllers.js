import { userSchema } from "../models/user.model.js"

export async function signUp(req, res) {
    const { email, password, username, image } = req.body

    const { error } = userSchema.validate({ email, password, username, image }, { abortEarly: false })

    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }
}