import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'
import SetDefaultAnimations from '../Utils/setDefaultAnimations.js'

export default class FBXViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManagerWrap = new LoadingManager()
        this.loadingManager = this.loadingManagerWrap.loadingManager
        this.loader = new FBXLoader(this.loadingManager)
        this.animations = null

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (obj) =>
            {
                this.loadedModel = obj
                this.loadedModel.scale.setScalar(0.02)
                this.scene.add(this.loadedModel)

                if(obj.animations.length > 0)
                    this.animations = new SetDefaultAnimations(obj, this.loadedModel)
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