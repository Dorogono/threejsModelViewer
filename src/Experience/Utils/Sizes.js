import EventEmitter from "./EventEmitter.js"

export default class Sizes extends EventEmitter
{
    constructor(container)
    {
        super()

        // Options
        this.container = container

        // Setup
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize Event
        window.addEventListener('resize', () =>
        {
            this.width = this.container.offsetWidth
            this.height = this.container.offsetHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })
    }
}