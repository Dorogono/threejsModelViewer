import * as THREE from 'three'
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class VTKViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new VTKLoader(this.loadingManager)

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (geo) =>
            {
                geo.computeVertexNormals()
                geo.center()

                const mat = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
                this.loadedModel = new THREE.Mesh(geo, mat)
                this.loadedModel.scale.setScalar(10)

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