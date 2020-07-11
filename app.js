const http = require('http')
const express =require('express')
const sequelize = require('./src/database/Database')
const Routes = require('./src/routes/Routes')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use('/api', Routes)

app.set('port', process.env.PORT || 3001)

sequelize.sync({force:true})
.then(()=>{
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port' + app.get('port'))
  })
})
