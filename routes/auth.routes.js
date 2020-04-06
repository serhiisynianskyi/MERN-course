const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Email not validate!').isEmail(),
    check('password', 'Min length of password is 6 symbols!')
    .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Error! Check form validation!'
        })
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email: email }) // wait until faind email in DB

      if (candidate) {
        res.status(400).json({ message: 'User with such email already exist!' })
      }


      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()
      res.status(201).json({ message: 'User has been created' })

    } catch (e) {
      res.status(500).json({ message: 'ERROR! Something going wrong!' })
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists()
  ],
  async (req, res) => {
    try {


      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Error! Not correct data while enter to the system!'
        })
      }
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Error, no user with such email' })
      }
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Password is not correct, try again!' })
      }
      const token = jwt.sign({ userId: user.id },
        config.get('jwtSecret'), { expiresIn: '1h' }
      ) // 1 prop - data which will be encrypted in web token, 2 prop- secret string, 3 prop - expiration date
      res.json({ token, userId: user.id })

    } catch (e) {
      res.status(500).json({ message: 'ERROR! Something going wrong!' })
    }
  }
);



module.exports = router
