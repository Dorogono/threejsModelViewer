import './style.css'
import Experience from './Experience/Experience.js'

const canvas = document.getElementById('canvas4D')

const model = {
    name: 'Fox',
    type: 'gltf',
    path: 'Fox/glTF/Fox.gltf'
}
// const model = {
//     name: 'Fox',
//     type: '3ds',
//     path: {
//         textures: {
//             normal: '3ds/portalgun/textures/normal.jpg'
//         },
//         model: '3ds/portalgun/portalgun.3ds'
//     }
// }

new Experience(canvas, model)