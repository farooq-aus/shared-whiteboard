const express = require('express')
const socket = require('socket.io')
const app = express()

app.use(express.static('public'))

const server = app.listen(5000, () => {
    console.log('listening on http://localhost:5000')
})

const io = socket(server)

let ips = []

io.on('connection', (socket) => {
    ips.push(socket.request.connection.remoteAddress)
    console.log('connection from '+ips)
    socket.on('disconnect', () => {
        ips.splice(ips.indexOf(socket.request.connection.remoteAddress), 1)
        console.log('disconnection from '+ips)
    })
    socket.on('mousePressed', (data) => {
        socket.broadcast.emit('mousePressed', data)
    })
})





app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})
