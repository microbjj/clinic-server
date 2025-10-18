const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Доступ запрещен' })
    }

    try {
        const hash = jwt.verify(token, process.env.JWT_SECRET)
        req.user = hash
        next()
    } catch (error) {
        res.status(401).json({ message: 'Неверный токен' })
    }
}