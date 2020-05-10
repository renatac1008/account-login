//require modules and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const findUser = require('./find_user')
const app = express()
const port = 3000

//set engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//set routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  console.log(req.body)
  let id = req.body.email
  let password = req.body.password
  let result = findUser(id, password)
  console.log(req.body)
  console.log(result)
  if (result.includes('!')) {
    res.render('index', { fail: result, password, id })
    return
  }
  res.render('show', { result })
})

//start express server and listen for connections

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`)
})