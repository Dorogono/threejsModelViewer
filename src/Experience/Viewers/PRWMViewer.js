import { PRWMLoader } from 'three/examples/jsm/loaders/PRWMLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class PRWMViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new PRWMLoader(this.loadingManager)

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (geo) =>
            {
                const mat = new THREE.MeshPhongMaterial()
                this.loadedModel = new THREE.Mesh(geo, mat)

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