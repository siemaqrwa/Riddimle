let token = ''
let tracks = []

function fetchData(url) {
    fetch(url, {
        method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        response.json()
    })
    .then(
        (data) => { 
            tracks = [...tracks, ...data.items]
            data.next ? fetchData(data.next) : displayPlaylist() 
        }
    );
}

function displayPlaylist() {
    let trackData = tracks.filter(e => e.track.available_markets.includes("PL")).map(e => (
        {
            image: e.track.album.images[0].url,
            artists: e.track.artists.map(e => e.name).join(", "),
            name: e.track.name,
            clip: e.track.preview_url
    }))
    
    console.log('[' + trackData.map(e=> `{
        "image": "${e.image}",
        "artists": "${e.artists}",
        "name": "${e.name}",
        "clip": "${e.clip}"
    }`).join(", ") + ']')
    
}

fetchData(tracklist)