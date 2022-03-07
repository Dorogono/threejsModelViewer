import * as THREE from 'three'
import { MDDLoader } from 'three/examples/jsm/loaders/MDDLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'
import ClipActionPPControl from '../Utils/ClipActionPPControl.js'

const bot = document.querySelector('.bot')
const totalTime = document.getElementById('total')
const currentTime = document.getElementById('current')
const timeBarStick = document.getElementById('time-bar-stick')

export default class MDDViewer
{
    constructor()
    {
        // Setup
        this.experience = new Experience()
        this.model = this.experience.model
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.loadingManagerWrap = new LoadingManager()
        this.loadingManager = this.loadingManagerWrap.loadingManager
        this.loader = new MDDLoader(this.loadingManager)
        this.objFile = null

        bot.style.display = 'flex'

        this.startLoading()
    }

    startLoading()
    {
        this.loader.load(
            this.model.path,
            (obj) =>
            {
                this.objFile = obj

                const morphTargets = obj.morphTargets

                const geo = new THREE.BoxGeometry()
                geo.morphAttributes.position = morphTargets

                const mat = new THREE.MeshNormalMaterial()

                this.loadedModel = new THREE.Mesh(geo, mat)

                this.scene.add(this.loadedModel)

                this.setAnimation(this.loadedModel, this.objFile)
            },
            (progress) => {},
            (error) =>
            {
                alert(error)
            }
        )
    }

    setAnimation(model, objFile)
    {
        this.mixer = new THREE.AnimationMixer(model)
        this.mixer.clipAction(objFile.clip).play()

        this.ppControl = new ClipActionPPControl(objFile ,this.mixer)
    }

    getTime()
    {
        this.totalTime = this.objFile.clip.duration
        totalTime.innerText = this.totalTime.toFixed(2)

        this.curTime = this.mixer.clipAction(this.objFile.clip).time
        currentTime.innerText = this.curTime.toFixed(2)

        this.progressPercent = ( this.curTime / this.totalTime ) * 100
        timeBarStick.style.width = `${this.progressPercent}%`
    }

    update()
    {
        this.animationStart = this.loadingManagerWrap.startAnimation
        if(this.mixer && this.animationStart)
            this.mixer.update(this.time.delta * 0.001)
        if(this.objFile !== null && this.animationStart)
            this.getTime()
    }
}