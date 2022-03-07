import * as THREE from 'three'
import Experience from '../Experience'
import gsap from 'gsap'

const loadingBarElement = document.querySelector('.loading-bar')
const bot = document.querySelector('.bot')

export default class LoadingManager
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.startAnimation = false

        this.getOverlay()
        this.getLoadingManager()
    }

    getOverlay()
    {
        this.overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
        this.overlayMaterial = new THREE.ShaderMaterial({
            transparent: true,
            uniforms:
            {
                uAlpha: { value: 1 }
            },
            vertexShader: `
                void main()
                {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uAlpha;
            
                void main()
                {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
                }
            `
        })
        this.overlay = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)
        this.scene.add(this.overlay)
    }

    getLoadingManager()
    {
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () =>
            {
                // Wait a little
                window.setTimeout(() =>
                {
                    // Animate overlay
                    gsap.to(this.overlayMaterial.uniforms.uAlpha, { duration: 1, value: 0, delay: 1 })

                    // Update loadingBarElement
                    loadingBarElement.classList.add('ended')
                    loadingBarElement.style.transform = ''
                }, 500)
            },

            // Progress
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                // Calculate the progress and update the loadingBarElement
                this.progressRatio = itemsLoaded / itemsTotal
                loadingBarElement.style.transform = `scaleX(${this.progressRatio})`

                if(this.progressRatio == 1 && bot.style.display == 'flex')
                {
                    bot.style.display = 'none'
                    window.setTimeout(() =>
                    {
                        bot.style.display = 'flex'
                        this.startAnimation = true
                    }, 1800)
                }
            }
        )

        return this.loadingManager
    }
}