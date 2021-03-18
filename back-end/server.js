const express = require('express') //importing express framework in a const
const bodyParser = require('body-parser') //body-parser is used for retrieving the requests in a JSON
const routes=require('./routes')
const app = express()  //initializing an express instance for the app
const port = 8080 //setting the port for the server
const cors=require('cors')

app.use(bodyParser.json()); //Transforming bodies of the requests in JSON object
app.use(cors());

app.listen(port, () => {    //Turn on server
    console.log('Server is running on port: ' + port)
})
app.use('/', routes)
