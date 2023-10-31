var express = require('express')

var app = express()

var cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



var indexRouter = require('./routes/indexRouter')
var getEvents=require('./routes/events')
var getEventItem=require('./routes/eventItem')
var postNewEvent=require('./routes/newEvent')
var updateEvent=require('./routes/eventEdit')
var deleteEvent=require('./routes/deleteditemEvent')
var newsLetterRoute=require('./routes/newsletter')
var user=require('./routes/user')

app.use(indexRouter)
app.use('/events',getEvents)
app.use('/events',getEventItem)
app.use('/events',updateEvent)
app.use('/events/new',postNewEvent)
app.use('/',deleteEvent)
app.use('/',newsLetterRoute)
app.use(user)

var port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("running server , http://localhost:" + port)
})