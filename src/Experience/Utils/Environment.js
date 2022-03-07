import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.scene.background = new THREE.Color(0xefede4)

        this.setSunLight()
    }

    setSunLight()
    {
        this.sunLight = new THREE.AmbientLight('#ffffff', 4)
        this.scene.add(this.sunLight)
    }
}