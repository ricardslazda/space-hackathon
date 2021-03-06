const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
connectionString = 'mongodb+srv://user:SpaceHack@314@cluster0-a8t47.mongodb.net/test?retryWrites=true&w=majority'

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function(){
	console.log('Listening on 3000')
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html")
})



MongoClient.connect(connectionString, {useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database')
    const db = client.db('asteroids')
    const Astcollection = db.collection('asteroids')

    app.get('/asteroids', (req, res) => {
      if (req.query.id != undefined){
        const cur = db.collection('asteroids').find({"asteroidID":req.query.id}).toArray()
        .then(results => {
          res.send(results);
        }).catch(error => console.error(error))
      }
      else {
        const cur = db.collection('asteroids').find().toArray()
        .then(results => {
          res.send(results);
        }).catch(error => console.error(error))
      }
    })
    
    app.get('/composition', (req, res) => {
      const cur = db.collection('composition').find({"class":req.query.type}).toArray()
      .then(results => {
        res.send(results)
      })
      .catch(error => console.error(error))
      })
  })
  .catch(error => console.error(error))

  