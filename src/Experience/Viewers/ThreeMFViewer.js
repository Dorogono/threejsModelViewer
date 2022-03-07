import * as THREE from 'three'
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class ThreeMFViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new ThreeMFLoader(this.loadingManager)

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (obj) =>
            {
                obj.quaternion.setFromEuler( new THREE.Euler( - Math.PI / 2, 0, 0))
                obj.position.set(-5, -11, -5)
                obj.scale.setScalar(0.4)
                
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