require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(express.static('dist'))


app.use(cors())


//MongoDB
//const mongoose = require('mongoose')
const Note = require('./models/note')



let notes = [
    {
        id: 1,
        content: "HTML is simple",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET, POST and Delete are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello from Victor!</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(x => {
        res.json(x)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    Note.findById(request, params.id).then(note => {
        response.json(note)
    })
})


app.post('/api/notes', (request, response) => {
    const body = request.body

    console.log(body)

    if (body.content === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

const PORT = process.env.PORT //|| 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})