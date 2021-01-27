const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')
const admin = require('firebase-admin')
const credentialAdmin = require('./to-admin/clave-firebase')

let task = [];

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

admin.initializeApp( { 
    credential: admin.credential.cert( credentialAdmin )
} )

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())

  server.use((req, res, next) => { 
   // const db = admin.firestore();
    //const ref = db.collection( 'task' ).doc()
    //const save = ref.set( { taskTitle: 'acabando con las ultimas tareas con firebase' } );
      //console.log( save )
      
    next()
  })

  server.get( '/', (req, res, next) => {
    console.log('d')
    app.render( req, res, '/', { task: task } );
  }) 

  server.post( '/add', (req, res) => {
    console.log(req.body.task)
    const taskClient = req.body.task;
      task.push( taskClient );
      res.json( { task } );
  })

  server.delete( '/remove', (req, res) => {
    const taskClient = req.body.task,
      index = task.indexOf( taskClient )
      task.splice( index, 1 );
      res.json( { task } );
  })

  server.put( '/update', (req, res) => {
    const taskClient = req.body.task,
      taskValue = req.body._value,
      index = task.indexOf( taskValue );
      task.splice( index, 1, taskClient );
      res.json( { task } );
  }) 

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
