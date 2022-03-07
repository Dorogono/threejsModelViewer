import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class STLViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new STLLoader(this.loadingManager)

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (geo) =>
            {
                const mat = new THREE.MeshPhongMaterial({
                    color: 0xff5533,
                    specular: 0x111111,
                    shininess: 200
                })
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