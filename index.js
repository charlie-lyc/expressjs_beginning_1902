const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')

const members = require('./members')
const logger = require('./middleware/logger')

const app = express()

/*******************************************************************/
// Build and Setup View(Template) Engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

/*******************************************************************/
// Built-in Middleware: express.static(), express.json(), express.urlencoded()

// Enable Static Folder
// And Just Request 'localhost:<port>/<file>'
// No Need Application and Method 'app.get(<route>)'
// Example: 'localhost:5000/', 'localhost:5000/about.html'
// app.use(express.static(path.join(__dirname, 'public')))

// Enable Request 'application/json'
// app.use(express.json()) // Built-in Middleware Deprecated!!!

// Enable Request 'application/x-www-form-urlencoded'
// app.use(express.urlencoded()) // Built-in Middleware Deprecated!!!

/*******************************************************************/
// Third-party Middleware
const bodyParser = require('body-parser')

// Enable Request 'application/json'
app.use(bodyParser.json())

// Enable Request 'application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded({ extended: false }))

/*******************************************************************/
// Custom Middleware

// Set Middleware
app.use(logger)

/*******************************************************************/
// Home(Landing) Page Route
app.get('/', (req, res) => {
    // res.send('Hello World')

    ///////////////////////////////////
    // res.send('<h1>Hello World</h1>')

    /////////////////////////////////////////////////////////////
    // Without Static Folder

    // res.sendFile(path.join(__dirname, 'public', 'index.html'))

    /////////////////////////////////////////////////////////////
    // With View(Template) Engine

    res.render('index', {
        // layout: 'main', // Default
        title: 'Members App',
        members
    })
})

/*******************************************************************/
// Get All Members
// app.get(
//     '/api/members',
//     // logger, // Set Middleware
//     (req, res) => {
//         // console.log(members)
//         res.json(members)
//     }
// )

// Get Single Member
// app.get('/api/members/:id', (req, res) => {
//     // console.log(req.params)
//     const isFound = members.some(member => member.id === parseInt(req.params.id))
//     if (isFound) {
//         const foundMember = members.find(member => member.id === parseInt(req.params.id))
//         res.json(foundMember)
//     } else {
//         res.status(400).json({ msg:`Not found member with id ${req.params.id}`})
//     }
// })

/*******************************************************************/
// Router Middleware
app.use('/api/members', require('./routes/api/membersRoute'))

/*******************************************************************/
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Sever running on port ${PORT}`))