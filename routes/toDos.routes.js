const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const ToDo = require('../models/ToDo')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const toDos = await ToDo.find({ owner: req.user.userId })
    res.status(201).json( toDos )
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

router.post('/delete', auth, async (req, res) => {
  try {
    const {id} = req.body;
    // Удалить пользователя
    // const deleteItem = await ToDo.deleteOne({ owner: req.user.userId })
    const deleteItem = await ToDo.deleteOne({ code: id })
    if(deleteItem.ok) {
      const toDos = await ToDo.find({ owner: req.user.userId })
      res.status(201).json( toDos )
    }
    res.status(201).json( {message: 'Невозможно удалить'} )

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/allToDos', auth, async (req, res) => {
  try {
    const toDos = await ToDo.find()
    res.status(201).json({records: toDos, owner: req.user.userId})
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await ToDo.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/:id', auth, async (req, res) => {
  try {
    const {title, description, dateExecution} = req.body
    const toDo = await ToDo.findOneAndUpdate({_id: req.params.id, title, description, dateExecution})
    res.json(toDo)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
