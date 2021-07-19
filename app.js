//sound lists
let sounds = [
    {
        title: "The Box",
        source: "./sounds/box.mp3",
        author: "Aaron Smith"
    },
    {
        title: "Dancin",
        source: "./sounds/dancin.mp3",
        author: "unknown"
    }
]
let initialSong = 1;
const audio = document.querySelector("#main-audio")
const playBtn = document.querySelector("#play-btn")
const prevBtn = document.querySelector("#prev-btn")
const nextBtn = document.querySelector("#next-btn")
const image = document.querySelector("#music-image")
const songNav = document.querySelector("#song-navigation")
const musicTitle = document.querySelector("#music-info")
const progress = document.querySelector("#progress")
const progressBar = document.querySelector("#progress-bar")

//initially when loaded
window.addEventListener("load", 
    loadSong()
)

//Event listeners
playBtn.addEventListener("click",()=>{
    let isPlaying = songNav.classList.contains("playing")
    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }
})

prevBtn.addEventListener("click", ()=>{
    prevSong()
})

nextBtn.addEventListener("click", ()=>{
    nextSong()
})

audio.addEventListener('timeupdate', (event) => {
    timeUpdate()
})

progressBar.addEventListener("click", (e)=>{
    timeChange(e)
})

//functions
function loadSong(){
        musicTitle.textContent = `${sounds[initialSong].title} - ${sounds[initialSong].author}`
        audio.src = sounds[initialSong].source
        audio.volume = 0.5
}

function playSong(){
    songNav.classList.add("playing")
    musicTitle.textContent = `${sounds[initialSong].title} - ${sounds[initialSong].author}`
    audio.play()
}

function pauseSong(){
    songNav.classList.remove("playing")
    audio.pause()
}

function prevSong(){
    if(initialSong == 0){
        initialSong = sounds.length - 1
    }else{
        initialSong--
    }
    
    loadSong()
    playSong()
}

function nextSong(){
    if(initialSong == sounds.length-1){
        initialSong = 0
    }else{
        initialSong++
    }

    loadSong()
    playSong()
}

function timeUpdate(){
    let currentTime = audio.currentTime
    let duration = audio.duration
    progress.style.width = `${(currentTime / duration) * 100}%`

    if(audio.currentTime === audio.duration){
        nextSong()
    }
}

function timeChange(e){
    let clickedArea = e.offsetX
    let totalWidth = progressBar.clientWidth
    let inPercent = (clickedArea / totalWidth)*100
    progress.style.width = `${inPercent}%`
    audio.currentTime = (clickedArea/totalWidth) * audio.duration

}