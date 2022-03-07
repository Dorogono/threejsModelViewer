import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class OBJViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new OBJLoader(this.loadingManager)
        this.matLoader = new MTLLoader(this.loadingManager)

        if(this.model.path.mtl == '')
        {
            this.startLoading()
        }
        else
        {
            this.startLoadingWithMat()
        }

    }

    startLoading()
    {
        this.loader.load(
            this.model.path.obj,
            (obj) =>
            {
                this.loadedModel = obj
                this.loadedModel.position.y = -3
                this.loadedModel.scale.setScalar(0.02)
                this.scene.add(this.loadedModel)
            }
        )
    }

    startLoadingWithMat()
    {
        this.matLoader.load(
            this.model.path.mtl,
            (mat) =>
            {
                mat.preload()
                this.loader.setMaterials(mat)
                this.loader.load(
                    this.model.path.obj,
                    (obj) =>
                    {
                        this.loadedModel = obj
                        this.loadedModel.position.y = -3
                        this.loadedModel.scale.setScalar(0.02)
                        this.scene.add(this.loadedModel)
                    }
                )
            },
            (progress) => {},
            (error) =>
            {
                alert(error)
            }
        )
    }
}