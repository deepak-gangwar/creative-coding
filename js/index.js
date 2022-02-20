// Pick a tag to do our code in
// then lets set up two.js in this tag
const  container = document.querySelector("section")

const params = {
    width: 500,
    height: 500
}

const two = new Two(params)
two.appendTo(container)

// config for our animation
const numberOfShapes = 25
const shapes = []
const shapeMin = 0
const shapeMax = 500
const shapeDiff = shapeMax - shapeMin

// make shapes
for (let i = 0; i < numberOfShapes; i++) { 
  const x = 250
  const y = 20 * i + 5

  const shape = two.makeRectangle(x, y, shapeMax, 10)
  shape.fill = '#5645d3'
  shape.noStroke()

  shapes.push(shape)
}

//listening to any updates
two.bind("update", function () {
  // draw
})

two.play()
