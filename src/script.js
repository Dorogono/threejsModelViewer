import './style.css'
import Experience from './Experience/Experience.js'

const canvas = document.getElementById('canvas4D')

const model = {
    name: 'Fox',
    type: 'gltf',
    path: 'Fox/glTF/Fox.gltf'
}

new Experience(canvas, model)