// Pick a tag to do our code in
// then lets set up two.js in this tag
const  container = document.querySelector("section")

const params = {
    width: 500,
    height: 500
}

const two = new Two(params)
two.appendTo(container)

//creating the shape
const shape = two.makeRectangle(250, 250, 100, 100)
shape.fill = '#f9bc31'
shape.noStroke()
shape.rotation = Math.PI * 0.25

//listening to any updates
two.bind("update", function () {
    shape.rotation += 0.05
})

two.play()