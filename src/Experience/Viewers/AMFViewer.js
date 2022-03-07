import { AMFLoader } from 'three/examples/jsm/loaders/AMFLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class AMFViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new AMFLoader(this.loadingManager)
        this.animations = null

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (obj) =>
            {
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