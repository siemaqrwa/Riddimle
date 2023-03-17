let tokenType = null
let tracklist = 'https://api.spotify.com/v1/playlists/2hqzHolqMog8xEuGyeykNL/tracks'
let trackData = []
let luckyTrack = null
let streak = 0

fetch('./data/playlist.json')
    .then((res) => res.json())
    .then((json) => {
        trackData = json
        displayTracks()
    })

let displayTracks = _ => {
    let display = ""


    shuffleArray(trackData)

    let selected = trackData.slice(0, 4)

    luckyTrack = ~~(Math.random()*4)

    selected[luckyTrack].answer = true

    display += `
    <header>
        <div class="header">
            <h1><span class="red">RIDDIMLE.</span> <span class="smol">Guess that riddim track!!!™</span></h1>
        </div>
        <div class="buttons">
            <div style="flex: 10"></div>
            <div onClick="playTrack()" class="playButtons play button">
                PLAY
                <img src="./img/play.svg" class="button-icon" />
            </div>
            <div onClick="displayTracks()" class="button next">
                NEXT
                <img src="./img/arrow-right.svg" class="button-icon" />
            </div>
        </div>
    </header>
    `

    display += `<main>`
    for (let track in selected) {
        display += `
            <div class="tracks" onClick="pickTrack(${track})" data-track="${track}">
                <div class="tracks-image" style="background-image: url(${selected[track].image})">
                </div>
                <div class="track-name">
                    <h3>${selected[track].name}</h3>
                    <h4>${selected[track].artists}</h4>
                </div>
            </div>
        `
    }
    display += `</main>`

    display += `
        <nav>
            <div onClick="playTrack()" class="playButtons play button">
                PLAY
                <img src="./img/play.svg" class="button-icon" />
            </div>
            <div onClick="displayTracks()" class="button next">
                NEXT
                <img src="./img/arrow-right.svg" class="button-icon" />
            </div>
        <nav>
        <audio controls name="media" id="clip" hidden>
            <source src="${selected[luckyTrack].clip}" type="audio/mpeg">
        </audio>
    `

    document.querySelector("body").innerHTML = display

    
    document.querySelector("#clip").pause()
}

function pickTrack(track) {
    document.querySelectorAll(".tracks").forEach(div => div.classList.add("non"))
    document.querySelectorAll(".button.next").forEach(div => div.classList.add("active"))
    document.querySelector(`div[data-track="${luckyTrack}"]`).classList.add("correct")
    if (track != luckyTrack) {
        document.querySelector(`div[data-track="${track}"]`).classList.add("incorrect")
        document.querySelector(`div[data-track="${luckyTrack}"]`).classList.add("anyway")
        displayStreak()
        streak = 0
        return
    }
    streak += 1
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function playTrack() {
    let audioPlayer = document.querySelector("#clip")
    let buttons = document.querySelectorAll(".playButtons")

    audioPlayer.loop = true
    
    if (audioPlayer.paused) {
        audioPlayer.play()
        buttons.forEach(x => x.innerHTML = `
        STOP
        <img src="./img/pause.svg" class="button-icon" />
        `)
        return
    }

    audioPlayer.pause()
    buttons.forEach(x => x.innerHTML = `
    PLAY
    <img src="./img/play.svg" class="button-icon" />
    `)
}

function displayStreak() {

    document.querySelector("body").innerHTML += `
        <div class="popout-container">
            <div class="popout">Your steak ends!
            ${
                streak == 0 ? "You get zero points :c" :
                streak == 1 ? "You've guessed 1 track!" :
                "You've guessed " + streak + " tracks!"
            }
            </div>
        </div>
    `
}
