import { coversAlbums } from "./covers.js";
function renderAlbums(albums){
    const songlist = document.querySelector("#songlist-covers")
    let html = "";
    for (let i = 0; i < coversAlbums.length; i++){
        html+=renderAlbum(coversAlbums[i])
    }
    songlist.innerHTML = html
}
function renderAlbum(album){
    let html = `<div id=${album.albumid} class="covers-album">
    <div class="main-info">
                    <img class="covers-cover" src="${album.cover}" alt="${album.alt}">
                    <div class="covers-album-description">
                        <h3>${album.albumTitle}</h3>
                        <p>${album.albumDesc}</p>
                    </div>
                    <div class="covers-song-description">
                        
                    </div>
                </div>
                <div class="covers-songlist">`
    for (let i = 0; i < album.songs.length; i++){
        if (i != 0){
            html+="<hr>"
        }
        html+=renderSong(album.songs[i])
    }
    html += `</div></div><div class="spacer"></div>`
    return html
}
function renderSong(song){
    const audio = song.audio == "" ? "": `<audio class="covers-audio" controls><source src="${song.audio}" type="audio/mp3"></audio>`;
    const yt = song.ytlink == "" ? "": `<a class="covers-yt-link" target="_blank" href="${song.ytlink}"><img src="images/youtube-logo.webp" width="30px" alt="youtube link"></a>`
    const linkType = song.type == "ub" ? `<a class="covers-link" target="_blank" href="${song.link}">
    <img src="images/ultrabox-logo.webp" width="30px" alt="ultrabox link"></a>`:
    song.type == "jb" ? `<a class="covers-link" target="_blank" href="${song.link}">
    <img src="images/jummbox-logo.webp" width="30px" alt="jummbox link"></a>` : "";
    return `<div class="covers-song">
                    <label class="covers-title" for="${song.label}">${song.title}</label>
                    <input id="${song.label}" type="radio" name="radio">
                    ${audio}
                    ${linkType}
                    ${yt}
                    <div class="covers-shadow"></div>
                </div>`
}
renderAlbums()
function songSelector(event){ 
    if (event.target.className == 'covers-title'){
        songHandler(event.target.innerHTML)
    } 
}
function songHandler(song){
    for (let i = 0; i < coversAlbums.length; i++){
        for (let j = 0; j < coversAlbums[i].songs.length; j++){
            const songTitle = coversAlbums[i].songs[j].title
            const songInfo = document.querySelector(`#${coversAlbums[i].albumid} .covers-song-description`)
            if (songTitle == song){
                songInfo.innerHTML=`<h4>Description</h4>
                        <p>${coversAlbums[i].songs[j].desc}</p>
                        <h4>Released</h4>
                        <p>${coversAlbums[i].songs[j].date}</p>`
            }
        }
    }
}
function copyShortlink(event){
    if (event.target.className == 'covers-link')
        event.preventDefault()
        copyHandler(event.target.href)
}
function copyHandler(url){
    for (let i = 0; i < coversAlbums.length; i++){
        for (let j = 0; j < coversAlbums[i].songs.length; j++){
            let bigurl = coversAlbums[i].songs[j].link;
            if (bigurl == url){
                navigator.clipboard.writeText(coversAlbums[i].songs[j].shortlink)
            }
        }
    }
}
const songlist = document.querySelector("#songlist-covers")
songlist.addEventListener("click", songSelector)
songlist.addEventListener("contextmenu", copyShortlink)
