const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const { v4: id } = require('uuid')

router.route('/').post((req, res, next) => {
    const filename = path.join(__dirname, '../public/events.json')
    if (fs.existsSync(filename)) {
        const data = req.body
        const errors = {}
        if (data.title.trim().length < 3) {
            errors.title = 'enter title >2 letters.'
        }
        if (!data.image.includes('http://')) {
            errors.image = 'enter url start word http'
        }
        if (data.date.trim().length === 0) {
            errors.date = 'enter date'
        }
        if (data.description.trim().length < 20) {
            errors.description = 'enter description >19 letters.'
        }

        if (Object.values(errors).length > 0) {
            return res.status(422).json({
                message: 'adding event failed',
                errors
            })
        }
        const events = require(filename)
        events.push({
            id: id(), title: data.title, image: data.image, date: data.date,
            description: data.description
        })
        try {
            fs.writeFileSync(filename, JSON.stringify(events, null, 2), 'utf-8')
            return res.json(events).status(200)
        } catch (error) {
            next(error)
        }
    }
})
module.exports = router