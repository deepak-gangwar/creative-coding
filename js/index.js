// Pick a tag to do our code in
// then lets set up two.js in this tag
const  container = document.querySelector("section")

const params = {
    width: 500,
    height: 500
}

const two = new Two(params)
two.appendTo(container)

//note: it would be cool to do this with Three.js
//where along with this animation, cubes move on the planar axis as well

const numberOfShapes = 12
const plotRadius = 150

const shapes = [numberOfShapes]

// creating the shape
for(let i = 0; i < numberOfShapes; i = i + 1) {
    const angle = fullRotation * i / numberOfShapes

    // offsets
    const x = plotRadius * Math.cos(angle)
    const y = plotRadius * Math.sin(angle)
    
    // making the shapes
    const shape = two.makeRectangle(x, y, 50, 50)
    shape.noStroke()
    shape.fill = '#f9bc31'
    shape.rotation = angle

    // adding them to a list so that I can use them 
    // later on, outside of this scope
    shapes.push(shape)
}

// making them a group so that i can rotate whole group at once
const group = two.makeGroup(shapes)
group.translation.set(250, 250)

let scaler = 1
let scaling = "grow"

//listening to the updates
two.bind("update", function () {
    group.rotation += 0.005

    if (scaling == "grow") {
        scaler += 0.005
    }

    if (scaling == "shrink") {
        scaler -= 0.005
    }

    if (scaler > 3) {
        scaling = "shrink"
    }

    if (scaler < 0.5) {
        scaling = "grow"
    }
    //for(let i = 0; i < numberOfShapes; i++) {
    //    shapes[i+1].rotation += 0.05
    //}

    shapes.forEach( shape => {
        shape.rotation += 0.006125
        shape.scale = scaler
    })
})

two.play()

