const express = require("express")
const ctrlAuth = require("../../controllers/auth")
const { validateBody } = require("../../middlewares")
const { schemas } = require("../../models/user")
const router = express.Router()

router.post("/register", validateBody(schemas.registerSchema), ctrlAuth.registerUser)
router.post("/login", validateBody(schemas.loginSchema), ctrlAuth.loginUser)

module.exports = router