import { Router } from "express"
import { signUp } from "../controllers/sign.controllers.js"

const router = Router()

router.post("/auth/sign-up", signUp)

export default router