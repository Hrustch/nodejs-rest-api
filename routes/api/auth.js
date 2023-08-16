const express = require("express")
const ctrlAuth = require("../../controllers/auth")
const { validateBody, upload } = require("../../middlewares")
const { schemas } = require("../../models/user")
const router = express.Router()
const { authenticate } = require("../../middlewares")
const { route } = require("./contacts")

router.post(  "/register", validateBody(schemas.registerSchema), ctrlAuth.registerUser)
router.post("/login", validateBody(schemas.loginSchema), ctrlAuth.loginUser)
router.post("/current", authenticate, ctrlAuth.getCurrent)
router.post("/logout", authenticate, ctrlAuth.logoutUser)

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlAuth.updAvatar
)

module.exports = router