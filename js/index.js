const container = document.querySelector("section")

const params = { 
  width: 500, 
  height: 500 
}

const two = new Two(params)
two.appendTo(container)

// config for our animation
const loopDuration = 60 * 4 // frames * duration
const numberOfShapes = 40
const shapeIncr = 20
// Some creative people found out that this value just works nice
const aDelay = 1 / 120
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

two.bind("update", function (frameCount) {
  // draw
  //frameCount will keep going up
  //but we want to loop the animation
  const currentFrame = frameCount % loopDuration

  //We want to have it in percentage as well
  const t = currentFrame / loopDuration
  //this t is kind of a general timeline for all

  shapes.forEach((shape, i) => {
    // Having a different animation start and end for each
    const aStart = aDelay * i
    const aEnd = aDelay * (numberOfShapes - i)

    // We can have a separate timeline for individual ones
    const u = mapAndClamp(t, aStart, 1 - aEnd, 0, 1)
    // take t as input which is a no. b/w 0 & 1 and map it to no. b/w 0 & 1

    // The easeInOutCubit function in our utils.js takes a number b/w 0 and 1
    // Spits out another number based on that easing
    shape.rotation = easeInOutCubic(u) * halfRotation
  })
})

two.play()

