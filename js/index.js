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

  shapes.forEach(shape => {
    // The easeInOutCubit function in our utils.js takes a number b/w 0 and 1
    // Spits out another number based on that easing
    shape.rotation = easeInOutCubic(t) * halfRotation
  })
})

two.play()

