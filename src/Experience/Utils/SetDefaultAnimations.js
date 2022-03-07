import * as THREE from 'three'
import Experience from '../Experience'

const select = document.getElementById('ani-select')
const bot = document.querySelector('.bot')
const totalTime = document.getElementById('total')
const currentTime = document.getElementById('current')
const playpause = document.querySelector('.ppBtn')
const timeBarStick = document.getElementById('time-bar-stick')

export default class SetDefaultAnimations
{
    constructor(file, loadedModel)
    {
        // Setup
        this.experience = new Experience()
        this.time = this.experience.time

        this.file = file
        this.loadedModel = loadedModel

        bot.style.display = 'flex'

        this.setAnimation()
    }

    setAnimation()
    {
        // Animation Settings
        this.animation = {}

        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.loadedModel)

        // Actions
        this.animation.actions = {}

        for(let i=0; i<this.file.animations.length; i++)
        {
            this.animation.actions[this.file.animations[i].name] = this.animation.mixer.clipAction(this.file.animations[i])
            const option = document.createElement('option')
            option.value = this.file.animations[i].name
            option.innerText = this.file.animations[i].name

            select.append(option)
        }

        this.animation.actions.current = this.animation.actions[this.file.animations[0].name]
        select.value = this.file.animations[0].name
        this.animation.actions.current.play()

        this.duration = this.animation.actions.current._clip.duration
        totalTime.innerText = this.duration.toFixed(2)


        this.changeAnimation()
        this.playNpause()
    }

    changeAnimation()
    {
        select.addEventListener('change', (e) =>
        {   
            if(e.target.value !== 'Static')
            {
                const oldAction = this.animation.actions.current
                const newAction = this.animation.actions[e.target.value]

                playpause.className = 'bi bi-pause ppBtn btns'
                
                newAction.reset()
                newAction.play()
                newAction.crossFadeFrom(oldAction, 1)
    
                this.animation.actions.current = newAction

                this.duration = this.animation.actions.current._clip.duration
                totalTime.innerText = this.duration.toFixed(2)
            }
            else
            {
                totalTime.innerText = 0
                playpause.className = 'bi bi-play-fill ppBtn btns'
                this.animation.actions.current.stop()
            }
        })
    }

    playNpause()
    {
        playpause.addEventListener('click', () => 
        {
            if(this.animation.actions.current.isRunning())
            {
                this.animation.actions.current.paused = true
                playpause.className = 'bi bi-play-fill ppBtn btns'
            }
            else 
            {
                this.animation.actions.current.paused = false
                playpause.className = 'bi bi-pause ppBtn btns'
            }
        
        })
    }

    update()
    {
        if(this.animation)
        {
            this.curTime = this.animation.actions.current.time
            currentTime.innerText = this.curTime.toFixed(2)

            this.progressPercent = ( this.curTime / this.duration ) * 100
            timeBarStick.style.width = `${this.progressPercent}%`

            this.animation.mixer.update(this.time.delta * 0.001)
        }
    }
}