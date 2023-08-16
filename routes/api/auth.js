const express = require("express")
const ctrlAuth = require("../../controllers/auth")
const { validateBody } = require("../../middlewares")
const { schemas } = require("../../models/user")
const router = express.Router()
const { authenticate } = require("../../middlewares")

router.post("/register", validateBody(schemas.registerSchema), ctrlAuth.registerUser)

router.post("/login", validateBody(schemas.loginSchema), ctrlAuth.loginUser)

router.post("/current", authenticate, ctrlAuth.getCurrent)

router.post("/logout", authenticate, ctrlAuth.logoutUser)

module.exports = router