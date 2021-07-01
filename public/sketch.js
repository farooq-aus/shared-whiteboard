const socket = io()

const randColor = () => Math.floor(Math.random() * 256)
let colorcode = []

socket.on('mousePressed', (data) => {
  stroke(data.colorcode)
  strokeWeight(5)
  line(data.mouseX, data.mouseY, data.pmouseX, data.pmouseY)
})

function setup() {
  createCanvas(displayWidth, displayHeight)
  background(255)
  colorcode = [randColor(),randColor(),randColor()]
}

function draw() {
  stroke(colorcode)
  strokeWeight(5)
  if (mouseIsPressed) {
    let data = {mouseX, mouseY, pmouseX, pmouseY, colorcode}
    socket.emit('mousePressed', data)
    line(mouseX, mouseY, pmouseX, pmouseY)
  }
}