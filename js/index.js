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

// make shapes
for (let i = 0; i < numberOfShapes; i++) { 
  
}

//listening to any updates
two.bind("update", function () {
  // draw
})

two.play()