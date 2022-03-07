import * as THREE from 'three'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class PLYViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new PLYLoader(this.loadingManager)

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (geo) =>
            {
                geo.computeVertexNormals()

                const mat = new THREE.MeshStandardMaterial({ color: 0x0055ff, flatShading: true })
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