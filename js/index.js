const container = document.querySelector("section")

const params = { 
  width: 500, 
  height: 500 
}

const two = new Two(params)
two.appendTo(container)

// config for our animation
const numberOfShapes = 40
const shapeIncr = 20
const shapes = []

// make shapes
for (let i = 0; i < numberOfShapes; i++) { 
  const size = (numberOfShapes - i) * shapeIncr
  const shape = two.makeRectangle(250, 250, size, size)

  if (i % 2 === 0) {
    shape.fill = '#f9d2cd'
  } else {
    shape.fill = '#f55745'
  }

  shape.noStroke()

  shapes.push(shape)
}

two.bind("update", function () {
  // draw
})

two.play()

