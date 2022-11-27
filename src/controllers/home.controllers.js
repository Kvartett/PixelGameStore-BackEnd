import { gamesCollection } from "../database/db"

export async function getHomePage(req, res) {
    try {
        const games = await gamesCollection.find().toArray()
        if (games.length === 0) {
            return res.status(404).send("Não foi encontrado nenhum game!")
        }

        res.send(games)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}