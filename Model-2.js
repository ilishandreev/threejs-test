import * as THREE from 'three'
import { GLTFLoader } from 'GLTFLoader'
import { OrbitControls } from 'OrbitControls'


let model_test

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Model
const loader = new GLTFLoader()
loader.load('model/Spheres.gltf', gltf => {
        model_test = gltf.scene
        scene.add(model_test)
            // model_test.rotation.set(1.5708, 0, 0)
            model_test.scale.set(0.1,0.1,0.1)
    },
    function(error) {
        console.log('Error: ' + error)
    }
)



//Ambient Light

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
scene.add(ambientLight)

// Sizes

const sizes = {
    // width: window.innerWidth,
    // height: window.innerHeight
    width: 3000,
    height: 3000
}

// window.addEventListener('resize', () => {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// Base camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 3000)

// const frustumSize = 10;
// const aspect = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 3000);


camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)


// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
    // renderer.setSize(1200, 1200)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Move object with mouse position

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}


// Scroll animation
const updateModel = (event) => {
    model_test.position.y = window.scrollY * .002
}
window.addEventListener('scroll', updateModel)

const clock = new THREE.Clock()

const tick = () => {

    targetX = mouseX * .001 //mouse position  
    targetY = mouseY * .001 //mouse position

    const elapsedTime = clock.getElapsedTime()

    // // Update objects
    // model_test.rotation.z = .1 * elapsedTime

    model_test.rotation.set(1.5708, 0, 0)

    model_test.rotation.z = .05 * -targetX
    model_test.rotation.x = model_test.rotation.x + .05 * targetY

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

setTimeout(tick, 100)