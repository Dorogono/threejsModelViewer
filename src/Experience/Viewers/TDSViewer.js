import * as THREE from 'three'
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader.js'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'
import SetDefaultAnimations from '../Utils/setDefaultAnimations.js'

export default class TDSViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManagerWrap = new LoadingManager()
        this.loadingManager = this.loadingManagerWrap.loadingManager
        this.loader = new TDSLoader(this.loadingManager)
        this.animations = null

        this.startLoading()
    }

    startLoading()
    {
        const normal = new THREE.TextureLoader().load(this.model.path.textures.normal)
        this.loader.setResourcePath('3ds/portalgun/textures/')
        this.loader.load(
            this.model.path.model,
            (obj) =>
            {
                obj.traverse((child) =>
                {
                    if(child.isMesh)
                    {
                        child.material.specular.setScalar(0.1)
                        child.material.normalMap = normal
                    }
                })

                if(obj.animations.length > 0)
                    this.animations = new SetDefaultAnimations(obj, obj)

                this.scene.add(obj)
            },
            (progress) => {},
            (error) =>
            {
                alert(error)
            }
        )
    }

    update()
    {
        this.animationStart = this.loadingManagerWrap.startAnimation
        if(this.animations != null && this.animationStart)
            this.animations.update()
    }
}