import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls'
// import * as dat from 'dat.gui'

// Loading Texture
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('model/textures/NormalMap.png')

// // Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Sphere 1



const geometry1 = new THREE.SphereBufferGeometry(1, 64, 64)

const material = new THREE.MeshStandardMaterial()
material.metallness = 1
material.roughness = 1
material.color = new THREE.Color(0xffffff)
// material.normalMap = normalTexture

const sphere1 = new THREE.Mesh(geometry1, material)

// Sphere 2
var material2 = new THREE.MeshPhongMaterial({color:'#8080f0'})
var geometry2 = new THREE.SphereBufferGeometry(.15, 64, 64)
const child1 = new THREE.Mesh(geometry2, material2)
child1.position.x = 1.5

var geometry3 = new THREE.SphereBufferGeometry(.15, 64, 64)
const child2 = new THREE.Mesh(geometry3, material2)
child2.position.x = 1

sphere1.add(child1,child2)
scene.add(sphere1)

// Light 1

const pointLight1 = new THREE.PointLight(0xff0000, 1)
pointLight1.position.set(-1.86, 1, -1.65)
pointLight1.intensity = 10
scene.add(pointLight1)

// Light 2

const pointLight2 = new THREE.PointLight(0xe1ff, 2)
pointLight2.position.set(0.69, -3, -3)
pointLight2.intensity = 6.8
scene.add(pointLight2)

// Light 3

const pointLight3 = new THREE.PointLight(0xffffff, 2)
pointLight3.position.set(0.69, 3, 3)
pointLight3.intensity = .3
scene.add(pointLight3)


/**
 * Sizes
 */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
    // width: 3000,
    // height: 3000
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

// Mouse position

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

const updateSphere = (event) => {
    sphere1.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()

const tick = () => {

    targetX = mouseX * .001 //mouse position  
    targetY = mouseY * .001 //mouse position

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere1.rotation.y = .5 * elapsedTime // Sphere 1 rotation

    // child.position.set(1.3,0,0)
    // child.rotation.y = -.5 * elapsedTime // Sphere 2 rotation

    sphere1.rotation.y += .05 * (targetX - sphere1.rotation.y) //mouse position to rotation
    sphere1.rotation.x += .05 * (targetY - sphere1.rotation.x) //mouse position to rotation
    sphere1.position.z += .05 * (targetY - sphere1.rotation.x) //mouse position to position

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

function animate() {
  
    child1.position.set(0, 0, 0)
    child1.rotateY(-0.02)
    child1.rotateZ(0.01)

    child1.translateX(1.2)

    child2.position.set(0, 0, 0)
    child2.rotateZ(0.01)
    child2.rotateY(0.02)
    child2.translateX(1.6)

    // mesh.position.set(0, 0, 0);
    // mesh.rotateZ(0.01);
    // mesh.translateX(1.0);
    
    requestAnimationFrame(animate)
    render()
  }

  function render() {
    renderer.render(scene, camera)
  }

  animate()