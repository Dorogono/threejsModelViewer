import { TiltLoader } from 'three/examples/jsm/loaders/TiltLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class TiltViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new TiltLoader(this.loadingManager)

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (obj) =>
            {
                obj.position.set(0, -50, 10)
                this.scene.add(obj)
            },
            (progress) => {},
            (error) =>
            {
                alert(error)
            }
        )
    }
}