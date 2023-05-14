require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
const  flash  = require('express-flash')
const connectDB = require('./server/config/db')
const app = express()
const port = 5000 || process.env.PORT

// Connect to Database
connectDB()


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

// static files
app.use(express.static('public'))

// Express Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    }
}))

// Flash Message
app.use(
    flash({
      sessionKeyName: 'express-flash',}))


// Templating Engine
app.use(expressLayouts)
app.set('layout', ('./layouts/main'))
app.set('view engine', 'ejs')

// Routes
const routes = ('./', require('./server/routes/customer'))
app.use('/', routes)

//  // Hand 404
// app.get('*', (req, res) => {
//     res.status(404).render('404')
//  })

app.listen(port, () => {
    console.log(`App Listening on port ${port}`)
})

