import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { RectAreaLightHelper } from 'RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';

let model_test

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


 // Model
const loader = new GLTFLoader()
loader.load('./model/Audit (assets).gltf', gltf => {
model_test = gltf.scene
scene.add(model_test)
// model.rotation.x = 1.5708
model_test.rotation.set(1.5708,0,0)
// gltf.rotateX(0.5)
}, 
    function (error) {
        console.log('Error: ' + error)
    }
)


// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light 2

const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.86, 1, -1.65)
pointLight2.intensity = 10
scene.add(pointLight2)

// const light1 = gui.addFolder('Light 1')

// light1.add(pointLight2.position, 'x').min(-6).max(3).step(0.01)
// light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// const pointLishtHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLishtHelper)

// Light 3

const pointLight3 = new THREE.PointLight(0xe1ff, 2)
pointLight3.position.set(0.69, -3, -3)
pointLight3.intensity = 6.8
scene.add(pointLight3)

// const light2 = gui.addFolder('Light 2')

// light2.add(pointLight3.position, 'x').min(-6).max(3).step(0.01)
// light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

// const light2Color = {
//     color: 0xff0000
// }

// light2.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light2Color.color)
//     })

// const pointLishtHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLishtHelper2)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 3000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)


// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */

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

// //Rotation by mouse click
// document.addEventListener(`mousedown`, function () {
//     if (model_test) {
//         model_test.rotation.x += 0.01;
//     }
// })

const clock = new THREE.Clock()

const tick = () => {

    targetX = mouseX * .001 //mouse position  
    targetY = mouseY * .001 //mouse position

    const elapsedTime = clock.getElapsedTime()

    // // Update objects
    // model_test.rotation.y = .5 * elapsedTime


    // model_test.rotation.y += .5 * (targetX - model_test.rotation.y) //mouse position to rotation
    // model_test.rotation.x += .05 * (targetY - model_test.rotation.x) //mouse position to rotation
    // model_test.position.z += .05 * (targetY - model_test.rotation.x) //mouse position to position

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()