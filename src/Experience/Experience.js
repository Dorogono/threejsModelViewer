import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import ModelViewer from './Utils/ModelViewer.js'
import Environment from './Utils/Environment.js'

let instance = null

export default class Experience
{
    constructor(canvas, model)
    {
        // Singleton
        if(instance)
        {
            return instance
        }

        instance = this

        // Global Access
        window.experience = this

        // Options
        this.canvas = canvas
        this.container = this.canvas.parentNode
        this.model = model

        // Setup
        this.sizes = new Sizes(this.container)
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.modelViewer = new ModelViewer()
        this.environment = new Environment()

        // Size resize Event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick Event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.modelViewer.update()
        this.renderer.update()
    }
}