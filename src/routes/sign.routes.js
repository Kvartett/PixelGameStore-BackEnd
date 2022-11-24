import { Router } from "express"
import { signUp, signIn } from "../controllers/sign.controllers.js"

const router = Router()

router.post("/auth/sign-up", signUp)
router.post("/auth/sign-in", signIn)

export default router