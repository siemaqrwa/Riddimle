// let token = 'BQBbYZWgi1HueL_a7AC7kDypFaro78Ju0JjpR_uo38YxXkKVeHrNcjcjI8bJD8ZoKPDpb1hM-UAPFDlm_l0Fwz2zlOu6i8IITb9oZpYRMnHmZ3EeV5put9KPdmZ6Tl9_ah8-xMDl3U618XtNnzyfNN6q8JcsVacwArzdeIMBoSOKpgNy4w'
let tracks = []
let tokenType = null
let tracklist = 'https://api.spotify.com/v1/playlists/2hqzHolqMog8xEuGyeykNL/tracks'
let trackData = []
let luckyTrack = null
/*
function fetchData(url) {
    fetch(url, {
                method: 'GET', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log(response.json().then(
                        (data) => { 
                            console.log(data)
                            tracks = [...tracks, ...data.items]
                            data.next ? fetchData(data.next) : displayTracks() 
                        }
                    ));
                });
}

fetchData(tracklist)
*/

fetch('../data/playlist.json')
    .then((res) => res.json())
    .then((json) => {
        trackData = json
        displayTracks()
    })

let displayTracks = _ => {
    let display = ""
    /*
    let trackData = tracks.filter(e => e.track.available_markets.includes("PL")).map(e => (
        {
            image: e.track.album.images[0].url,
            artists: e.track.artists.map(e => e.name).join(", "),
            name: e.track.name,
            clip: e.track.preview_url
    }))

    console.log(trackData.map(e=> `{
        "image": "${e.image}",
        "artists": "${e.artists}",
        "name": "${e.name}",
        "clip": "${e.clip}"
    }`).join(", "))

    */

    shuffleArray(trackData)

    let selected = trackData.slice(0, 4)

    luckyTrack = ~~(Math.random()*4)

    selected[luckyTrack].answer = true

    display += `
    <header>
        <div class="header">
            <h1><span class="red">RIDDIMLE.</span> <span class="smol">Guess that riddim track!!!™</span></h1>
        </div>
        <div class="button">
                <audio controls autoplay name="media" id="clip">
                    <source src="${selected[luckyTrack].clip}" type="audio/mpeg">
                </audio>
        </div>
    </header>
    `

    display += `<main>`
    for (let track in selected) {
        display += `
            <div class="tracks" onClick="pickTrack(${track})" data-track="${track}">
                <div class="tracks-image" style="background-image: url(${selected[track].image})">
                </div>
                <h3>${selected[track].name}</h3>
                <h4>${selected[track].artists}</h4>
            </div>
        `
    }
    display += `</main>`

    document.querySelector("body").innerHTML = display
}

function pickTrack(track) {
    document.querySelectorAll(".tracks").forEach(div => div.classList.add("non"))
    document.querySelector(`div[data-track="${luckyTrack}"]`).classList.add("correct")
    if (track != luckyTrack) document.querySelector(`div[data-track="${track}"]`).classList.add("incorrect")
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}