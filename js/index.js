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
const numberOfShapes = 50
const shapes = []
const startWidth = 50
const endWidth = 500
const diffWidth = endWidth - startWidth
const startRotation = 0
const endRotation = fullRotation * 6 / 360
const loopDuration = 12 * 60

// make shapes
for (let i = 0; i < numberOfShapes; i++) { 
  const x = 250
  let y = i * 20 + 5

  if (i >= 25) {
    y -= 490
  }

  const shape = two.makeRectangle(x, y, startWidth, 10)
  shape.noStroke()
  shape.fill = '#5645D3'

  // We did the purple ones first and then did blue ones
  // because we want blue ones to overlay the purple ones
  if (i >= 25) {
    shape.fill = '#99e6e0'
  }
  // We could have done modulo here, but we have tried to overlay

  shapes.push(shape)
}

//listening to any updates
two.bind("update", function (frameCount) {
  // draw
  const currentFrame = frameCount % loopDuration
  const t = currentFrame / loopDuration

  shapes.forEach((shape, i) => {
    let r = startRotation
    let w = startWidth

    // This setup here is the general timeline per shape
    if (t < 0.25) {
      // sequence 1, width grow
      // mapAndClamp of u just stretches the timeline here in all of them
      const u = mapAndClamp(t, 0, 0.25, 0, 1)
      w = mapAndClamp(u, 0, 1, startWidth, endWidth)
      r = startRotation
    } else if (t < 0.5) {
      // sequence 2, rotate the rectangles
      const u = mapAndClamp(t, 0.25, 0.5, 0, 1)
      w = endWidth
      r = mapAndClamp(u, 0, 1, startRotation, endRotation)
    } else if (t < 0.75) {
      // sequence 3, width shrinks
      const u = mapAndClamp(t, 0.5, 0.75, 0, 1)
      w = mapAndClamp(u, 0, 1, endWidth, startWidth)
      r = endRotation
    } else  {
      // sequence 4, rotate back to normal
      const u = mapAndClamp(t, 0.75, 1, 0, 1)
      w = startWidth
      r = mapAndClamp(u, 0, 1, endRotation, startRotation)
    }

    shape.width = w
    shape.rotation = r
  })
})

two.play()