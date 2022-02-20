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
const loopDuration = 60 * 4
const aDelay = 1 / 120

// make shapes
for (let i = 0; i < numberOfShapes; i++) { 
  const x = 250
  const y = 20 * i + 5

  const shape = two.makeRectangle(x, y, shapeMin, 10)
  shape.fill = '#5645d3'
  shape.noStroke()

  shapes.push(shape)
}

//listening to any updates
two.bind("update", function (frameCount) {
  // draw
  const currentFrame = frameCount % 240
  const t = currentFrame / loopDuration

  shapes.forEach((shape, i) => {
    const aStart = 0.01 * (numberOfShapes - i)
    const aEnd = 0.01 * i
  
    //const u = mapAndClamp(t, aStart, 1 - aEnd, 0, 1)

    // Breaking the timeline into two parts
    // So that it feels back and forth seamless
    let u = 0
    
    // We start at 0 go all the way upto 1
    // and then back from 1 to 0 again

    // mapAndClamp is breaking our timeline into parts
    
    // if timeline is less than half completed
    if(t < 0.5) {
      u = mapAndClamp(t, aStart, 0.5 - aEnd, 0, 1)
      // first two parameters mean start to half way through

      // changes 1 to 0.5 in aEnd because doing it for half timeline
      // keeping last two 0 and 1 because we want max shapeDiff
    } else {
      u = mapAndClamp(t, 0.5 +aStart, 1 - aEnd, 1, 0)
      // first two params mean half way through to end

      // added 0.5 (half timeline) to aStart
      // ending again becomes 1 - aEnd
      //reversed 0 and 1 in the end because now our initial point is 1
    }
    
    shape.width = shapeMin + shapeDiff * easeInOutCubic(u)
  })
})

two.play()
