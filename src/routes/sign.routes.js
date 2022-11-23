import { Router } from "express"

const router = Router()

router.post("/auth/sign-up", signUp)