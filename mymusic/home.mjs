import { albums } from "./mymusic.js";
function renderFrontPageSongList(albums) {
    let featuredSongList = []
    for (let i = 0; i < albums.length; i++) {
        for (let j = 0; j < albums[i].songs.length; j++) {
            const songid = albums[i].songs[j].label;
            if (songid == "sky-racer" || 
                songid == "sound-limit" || 
                songid == "it-all-comes-down-to-this") {
                featuredSongList.push(albums[i].songs[j])
            }
        }
    }
    let html = ""
    for (let i = 0; i < featuredSongList.length; i++) {
        if (i == 0) {
            html += '<div class="song" id = "first-page-song">'
        } else {
            html += '<div class="song">'
        }
        html += renderSong(featuredSongList[i])
    }
    const featuredSongs = document.querySelector("#featured-group")
    featuredSongs.innerHTML = html
}
function renderSong(song){

    const audio = song.audio == "" ? "": `<audio controls><source src="${song.audio}" type="audio/mp3"></audio>`;
    const isThereADate = song.date == "" ? "": `<h3 class="date-title">Released</h3><p class="date-text">${song.date}</p>`;
    const yt = song.ytlink == "" ? "": `<a class="yt-link" target="_blank" href="${song.ytlink}"><img src="images/youtube-logo.webp" width="30px" alt="youtube link"></a>`
    const linkType = song.type == "ub" ? `<a class="link" target="_blank" href="${song.link}"><img src="images/ultrabox-logo.webp" width="30px" alt="ultrabox link"></a>`:
    song.type == "jb" ? `<a class="link" target="_blank" href="${song.link}"><img src="images/jummbox-logo.webp" width="30px" alt="jummbox link"></a>` : "";
    return `        <label class="song-title" for="${song.label}">${song.title}</label>
                    <input id="${song.label}" type="radio" name="radio">
                    <img class="${song.outline}" src="${song.cover}" alt="${song.alt}">
                    ${audio}
                    ${linkType}
                    ${yt}
                    <div class="info">
                        <h3 class="desc-title">Description</h3>
                        <p class="desc-text">${song.desc}</p>
                        ${isThereADate}
                    </div>
                    <div class="shadow"></div>
                </div>
    `
    
}
renderFrontPageSongList(albums)
function copyShortlink(event){
    if (event.target.className == 'link')
        event.preventDefault()
        copyHandler(event.target.href)
}
function copyHandler(url){
    for (let i = 0; i < albums.length; i++){
        for (let j = 0; j < albums[i].songs.length; j++){
            let bigurl = albums[i].songs[j].link;
            console.log(bigurl)
            if (bigurl == url){
                navigator.clipboard.writeText(albums[i].songs[j].shortlink)
            }
        }
    }
}
const songlist = document.querySelector("#featured-group")
songlist.addEventListener("contextmenu", copyShortlink)