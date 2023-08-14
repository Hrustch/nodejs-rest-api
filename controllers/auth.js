const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = process.env
const { HttpError } = require("../helpers")

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (await User.findOne({ email })) {
      throw HttpError(409, "Email уже зарегестрирован")
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({ ...req.body, password: hashPassword })
    console.log(newUser)
    res.status(201).json({
      email: newUser.email,
    })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw HttpError(401, "Email invalid")
    }

    const passwordCompare = await bcrypt.compare(user.password, password)
    if (passwordCompare) {
      throw HttpError(401, "Password invalid")
    }

    const payload = {
      id: user.id,
    }

    const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" })

    res.status(201).json({ token })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerUser,
  loginUser,
}