import * as THREE from 'three'
import { BVHLoader } from 'three/examples/jsm/loaders/BVHLoader'
import Experience from '../Experience.js'
import LoadingManager from '../Utils/LoadingManager.js'
import ClipActionPPControl from '../Utils/ClipActionPPControl.js'

const bot = document.querySelector('.bot')
const totalTime = document.getElementById('total')
const currentTime = document.getElementById('current')
const timeBarStick = document.getElementById('time-bar-stick')

export default class BVHViewer
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
        this.loader = new BVHLoader(this.loadingManager)
        this.progress = 0
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
                this.skeletonHelper = new THREE.SkeletonHelper(obj.skeleton.bones[0])
                this.skeletonHelper.skeleton = obj.skeleton

                const boneContainer = new THREE.Group()
                boneContainer.add(obj.skeleton.bones[0])

                boneContainer.scale.setScalar(0.04)

                this.scene.add(this.skeletonHelper, boneContainer)

                this.setAnimation(this.skeletonHelper)
            },
            (progress) => {},
            (error) =>
            {
                alert(error)
            }
        )
    }

    setAnimation(bones)
    {
        this.mixer = new THREE.AnimationMixer(bones)
        this.mixer.clipAction(this.objFile.clip).setEffectiveWeight(1.0).play()

        this.ppControl = new ClipActionPPControl(this.objFile ,this.mixer)
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