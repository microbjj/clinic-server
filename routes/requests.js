const express = require('express')
const router = express.Router()
const Request = require('../models/Request')
const auth = require('../middleware/auth')

router.post('/', async (req, res) => {
    try {
        const request = new Request(req.body)
        console.log(request)
        await request.save()
        res.status(201).json({ message: 'Заявка успешно создана' })
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при создании заявки' })
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const requests = await Request.find().sort({ createdAt: -1 })
        res.json(requests)
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении заявок' })
    }
})

module.exports = router