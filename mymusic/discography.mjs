import { albums } from "./mymusic.js";
function renderAlbums(albums) {
    const songlist = document.querySelector("#songlist")
    let html = ""
    for (let i = 0; i < albums.length; i++){
        html+=renderAlbum(albums[i])
    }
    songlist.innerHTML = html
}
function renderAlbum(album){
    let html = `<div id="${album.albumid}" class="album">`
    for (let i = 0; i < album.songs.length; i++){
        html+=renderSong(album.songs[i])
    }
    html += `</div><div class="spacer"></div>`;
    return html

}

function renderSong(song){
    const audio = song.audio == "" ? "": `<audio controls><source src="${song.audio}" type="audio/mp3"></audio>`;
    const isThereADate = song.date == "" ? "": `<h3 class="date-title">Released</h3><p class="date-text">${song.date}</p>`;
    const yt = song.ytlink == "" ? "": `<a class="yt-link" target="_blank" href="${song.ytlink}"><img src="images/youtube-logo.webp" width="30px" alt="youtube link"></a>`
    const linkType = song.type == "ub" ? `<a class="link" target="_blank" href="${song.link}"><img src="images/ultrabox-logo.webp" width="30px" alt="ultrabox link"></a>`:
    song.type == "jb" ? `<a class="link" target="_blank" href="${song.link}"><img src="images/jummbox-logo.webp" width="30px" alt="jummbox link"></a>` : "";
    return `<div class="${song.class}">
                    <label class="song-title" for="${song.label}">${song.title}</label>
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
renderAlbums(albums)