import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader'
import Experience from '../../Experience.js'
import LoadingManager from '../../Utils/LoadingManager.js'

export default class IFCViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new IFCLoader(this.loadingManager)
        this.loader.ifcManager.setWasmPath('./ifc/')

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (obj) =>
            {
                this.loadedModel = obj.mesh
                this.scene.add(this.loadedModel)
            }
        )
    }
}