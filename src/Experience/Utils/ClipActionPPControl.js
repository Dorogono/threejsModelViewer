const playpause = document.querySelector('.ppBtn')

export default class ClipActionPPControl
{
    constructor(file, mixer)
    {
        this.mixer = mixer
        
        playpause.addEventListener('click', () =>
        {
            if(this.mixer.clipAction(file.clip).isRunning())
            {
                this.mixer.clipAction(file.clip).paused = true
                playpause.className = 'bi bi-play-fill ppBtn'
            }
            else
            {
                this.mixer.clipAction(file.clip).paused = false
                playpause.className = 'bi bi-pause ppBtn'
            }
        })
    }
}