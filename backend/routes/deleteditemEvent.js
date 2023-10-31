const path = require('path')
const fs = require('fs')

const router = require('express').Router()
router.route('/events/:eventId').delete((req, res, next) => {
    const id = req.params.eventId
    const filename = path.join(__dirname, '../public/events.json')
    if (fs.existsSync(filename)) {
        fs.readFile(filename, 'utf-8', (err, result) => {
            if (err) return res.json({ "Error message": err }).status(404)
            const events = JSON.parse(result)
            const deleteEvent = events.filter(event => event.id !== id)
            if (deleteEvent) {
                try {
                    fs.writeFileSync(filename, JSON.stringify(deleteEvent, null, 2), 'utf-8')
                    return res.json(deleteEvent).status(200)    
                } catch (error) {
                    return res.json({ message: 'could not delete event' }).status(500) 
                }  
            } 
        })
    }
})

module.exports = router