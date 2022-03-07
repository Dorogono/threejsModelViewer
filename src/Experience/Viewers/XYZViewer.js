import * as THREE from 'three'
import { XYZLoader } from 'three/examples/jsm/loaders/XYZLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class XYZViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new XYZLoader(this.loadingManager)

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (geo) =>
            {
                geo.center()

                const vertexColors = (geo.hasAttribute('color') === true)

                const mat = new THREE.PointsMaterial({
                    size: 0.1,
                    vertexColors: vertexColors
                })

                this.loadedModel = new THREE.Points(geo, mat)
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