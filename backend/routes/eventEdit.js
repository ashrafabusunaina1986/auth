const path = require('path')
const fs = require('fs')

const router = require('express').Router()


router.route('/:eventId/edit').patch((req, res, next) => {
    const eventId = req.params.eventId
    const { title, image, date, description } = req.body
    const filename = path.join(__dirname, '../public/events.json')
    if (fs.existsSync(filename)) {
        fs.readFile(filename, 'utf-8', (err, result) => {
            if (err) return res.json({ "Error message": err }).status(500)
            const events = JSON.parse(result)

            const indexEvent = events.findIndex(event => event.id === eventId)
            console.log(indexEvent)
            if (indexEvent > -1) {
                // return res.json(indexEvent)
                const e = {
                    id: eventId,
                    title: title,
                    image: image,
                    date: date,
                    description: description
                }
                events[indexEvent] = e
                try {
                    fs.writeFileSync(filename, JSON.stringify(events, null, 2), 'utf-8')
                    return res.json(events[indexEvent]).status(200)
                } catch (error) {
                    return res.json(error).status(500)
                }

            } else return res.json({ message: 'could not edit event.' }).status(500)
        })
    }
})
module.exports = router