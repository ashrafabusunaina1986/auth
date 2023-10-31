const path = require('path')
const fs = require('fs')

const router = require('express').Router()
router.route('/').get((req, res, next) => {
    const filename = path.join(__dirname, '../public/events.json')
    if (fs.existsSync(filename)) {
        fs.readFile(filename, 'utf-8', (err,result) => {
            if (err) return res.json({ "Error message": err }).status(404)
            setTimeout(()=>{
                return res.json(JSON.parse(result).reverse()).status(200)    
            },2000)
            
        })
    }
    
})

module.exports = router