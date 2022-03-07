import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class PCDViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new PCDLoader(this.loadingManager)

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (obj) =>
            {
                obj.geometry.center()
                obj.geometry.rotateX(Math.PI)

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