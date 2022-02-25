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
const aDelay = 0.001

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

  // NOTE
  // Its all about knowing where the put things in the right place.
  // Is this on a general level, 
  // is this on a per shape level, 
  // or is it on a per sequence level?

  // GENERAL LEVEL
  
  const currentFrame = frameCount % loopDuration
  const t = currentFrame / loopDuration

  shapes.forEach((shape, i) => {
    // PER SHAPE LEVEL
    // Each shape has its own timeline and delay

    let r = startRotation
    let w = startWidth

    // We want to add delay per shape
    // That's why we are adding it here
    let aStart = aDelay * i
    let aEnd = aDelay * (numberOfShapes - i)

    if (i >= 25) {
      aStart = aDelay * (numberOfShapes - i)
      aEnd = aDelay * i
    }

    // This setup here is the general timeline per shape
    // Each individual timeline has four parts to it 
    if (t < 0.25) {
      // PER SEQUENCE LEVEL

      // sequence 1, width grow
      // mapAndClamp of u just stretches the timeline here in all of them
      const u = mapAndClamp(t, 0 + aStart, 0.25 - aEnd, 0, 1)
      const cu = easeInOutCubic(u)
      w = mapAndClamp(cu, 0, 1, startWidth, endWidth)
      r = startRotation
    } else if (t < 0.5) {
      // sequence 2, rotate the rectangles
      const u = mapAndClamp(t, 0.25 + aStart, 0.5 - aEnd, 0, 1)
      const cu = easeInOutCubic(u)
      w = endWidth
      r = mapAndClamp(cu, 0, 1, startRotation, endRotation)
    } else if (t < 0.75) {
      // sequence 3, width shrinks
      const u = mapAndClamp(t, 0.5 + aStart, 0.75 - aEnd, 0, 1)
      const cu = easeInOutCubic(u)
      w = mapAndClamp(cu, 0, 1, endWidth, startWidth)
      r = endRotation
    } else  {
      // sequence 4, rotate back to normal
      const u = mapAndClamp(t, 0.75 + aStart, 1 - aEnd, 0, 1)
      const cu = easeInOutCubic(u)
      w = startWidth
      r = mapAndClamp(cu, 0, 1, endRotation, startRotation)
    }

    shape.width = w
    shape.rotation = r

    if(i >= 25) {
      shape.rotation = r * -1
    }
  })
})

two.play()