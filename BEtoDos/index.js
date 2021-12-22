const express = require('express')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

const url = "mongodb://root:password@localhost:27017"
const Client = new MongoClient(url,{})
const ObjectId = require('mongodb').ObjectId

const connToDb = (callback) => {
    Client.connect( (error) => {
        const db = Client.db('hyperlynx')
        const collection = db.collection('toDos')
        callback(collection)
    })
}

//All documents in your collection
app.get('/', async (req, res) => {
    connToDb(async (collection)=>{
        const toDos = await collection.find({}).toArray()
        res.json(toDos)
    })
})

//All completed documents in your collection
app.get('/completed', async (req, res) => {
    connToDb(async (collection)=>{
        const toDos = await collection.find({status:{$in:['completed']}}).toArray()
        res.json(toDos)
    })
})

//All uncompleted documents in your collection
app.get('/uncompleted', async (req, res) => {
    connToDb(async (collection)=>{
        const toDos = await collection.find({status:{$in:['uncompleted']}}).toArray()
        res.json(toDos)
    })
})

//Update a document(task) in your collection. For example task changed to complete
app.put('/updateOne/:id', async (req, res) => {
    const id = ObjectId(req.params.id)

    connToDb(async (collection)=>{
        const result = await collection.updateOne({_id: id}, {$set: {status: 'completed'}})
        if(result.acknowledged) {
            res.json({success: true, data: result})
        } else {
            res.json({success: false, data: result})
        }
    })
})

//Update a document(task) in your collection. For example task changed to complete
app.put('/toDo/:id', async (req, res) => {
    const id = ObjectId(req.params.id)
    let newTodo = req.body.task

    connToDb(async (collection)=>{
        const result = await collection.updateOne({_id: id}, {$set: {task: newTodo}})
        if(result.acknowledged) {
            res.json({success: true, data: result})
        } else {
            res.json({success: false, data: result})
        }
    })
})


//add a document to your collection
app.post('/add', async (req, res) => {
    connToDb(async (collection)=>{
        const toDos = await collection.insertOne({task:'', status:'uncompleted'}).toArray()
        res.json(toDos)
    })
})

//add many documents to your collection
app.post('/addMany', async (req, res) => {
    connToDb(async (collection)=>{
        const toDos = await collection.insertMany([{},{},{}]).toArray()
        res.json(toDos)
    })
})

//Add a document(task) to your collection
app.post('/toDos', async (req, res) => {
    const toDosToAdd = {
        task: req.body.task,
        status: 'uncompleted'
    }
    MongoClient.connect(url, {}, async (error, client) => {
        const db = client.db('hyperlynx')
        const collection = db.collection('toDos')
        const result = await collection.insertOne(toDosToAdd)
        if(result.acknowledged) {
            res.json({success: true, data: result})
        } else {
            res.json({success: false, data: result})
        }
    })
})

//Delete a document in your collection
//In Postman change to DELETE. URL http://127.0.0.1:3000/toDos/61a77c67bb504f579581311d. 61a etc.. is the Object id. Body to none.
app.delete('/toDos/:id', (req, res) => {
    const id = ObjectId(req.params.id)

    MongoClient.connect(url, {}, async (error, client) => {
        const db = client.db('hyperlynx')
        const collection = db.collection('toDos')
        const result = await collection.deleteOne({_id:id})
        if(result.acknowledged) {
            res.json({success: true, data: result})
        } else {
            res.json({success: false, data: result})
        }
    })
})


app.listen(port)