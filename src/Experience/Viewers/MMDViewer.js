import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class MMDViewer
{
    constructor()
    {
         // Setup
         this.experience = new Experience()
         this.model = this.experience.model
         this.scene = this.experience.scene
         this.loadingManager = new LoadingManager().loadingManager
         this.loader = new MMDLoader(this.loadingManager)

         this.justModelLoading()
    }

    justModelLoading()
    {
        this.loader.load(
            this.model.path,
            (obj) =>
            {
                this.loadedModel = obj
                this.loadedModel.scale.setScalar(0.07)
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