import { VRMLoader } from 'three/examples/jsm/loaders/VRMLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class VRMViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new VRMLoader(this.loadingManager)

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (obj) =>
            {
                this.loadedModel = obj.scene
                this.loadedModel.rotation.y = Math.PI
                this.loadedModel.position.y = -2
                this.loadedModel.scale.setScalar(2)
                this.scene.add(this.loadedModel)
            },
            (progress) => {},
            (error) =>
            {
                alert(error)
            }
        )
    }
}