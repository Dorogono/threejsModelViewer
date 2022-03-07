import * as THREE from 'three'
import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'

export default class NRRDViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.loadingManager = new LoadingManager().loadingManager
        this.loader = new NRRDLoader(this.loadingManager)

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (file) =>
            {
                const geo = new THREE.BoxGeometry(file.xLength, file.yLength, file.zLength)
                const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
                const cube = new THREE.Mesh(geo, mat)
                cube.visible = false

                const box = new THREE.BoxHelper( cube )
                this.scene.add(box)

                box.applyMatrix4(file.matrix)
                this.scene.add(cube)
                
                //z plane
				const sliceZ = file.extractSlice( 'z', Math.floor( file.RASDimensions[ 2 ] / 4 ) );
				this.scene.add( sliceZ.mesh );
				//y plane
				const sliceY = file.extractSlice( 'y', Math.floor( file.RASDimensions[ 1 ] / 2 ) );
				this.scene.add( sliceY.mesh );
				//x plane
				const sliceX = file.extractSlice( 'x', Math.floor( file.RASDimensions[ 0 ] / 2 ) );
				this.scene.add( sliceX.mesh );
            },
            (progress) => {},
            (error) =>
            {
                alert(error)
            }
        )
    }
}