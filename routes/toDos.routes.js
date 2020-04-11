const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const ToDo = require('../models/ToDo')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    console.log('ROUTE1');
    const toDos = await ToDo.find({ owner: req.user.userId })
    res.status(201).json( toDos )
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    console.log('ROUTE2');
    res.status(201)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/create', auth, async (req, res) => {
  try {
    const {title, description, dateExecution} = req.body
    const code = shortid.generate()
    const existing = await ToDo.findOne({ title })

    if (existing) {
      return res.json({ toDo: existing })
    }
    const toDo = new ToDo({
      code, title, description, dateExecution, owner: req.user.userId, status: false
    })
    await toDo.save()

    res.status(201).json({ toDo })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/allToDos', auth, async (req, res) => {
  try {
    console.log('ROUTE5');
    res.status(201)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
