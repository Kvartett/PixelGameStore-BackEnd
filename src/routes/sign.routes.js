import { Router } from "express"
import { signUp, signIn } from "../controllers/sign.controllers.js"
import { getHomePage } from "../controllers/home.controllers.js"
import { validateToken } from "../middleware/validate.token.middleware.js"

const router = Router()

router.post("/auth/sign-up", signUp)
router.post("/auth/sign-in", signIn)
router.post("/", getHomePage)

export default router