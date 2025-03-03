import { games } from "./archive-songs.js";
function renderGames(games) {
    const songList=document.querySelector("#songlist-archive");
    let html="";
    for (let i=0;i<games.length; i++) {
        html += renderGame(games[i])
    }
    songList.innerHTML = html;
}
function renderGame(game) {
    let html = `<div class="group-shadow"><div class="archive-series" id="${game.gameid}">
                    <div class="archive-group">
                        <img class="series-logo" src="${game.logo}" alt="${game.alt}">
                        <h1 class="series">${game.gametitle}</h1>
                    </div>`
        for (let i=0; i<game.songs.length; i++) {
            html += renderSong(game.songs[i]);
        }
        html += "</div></div><div class='spacer'></div>"
        return(html)
}
function renderSong(song) {
    return`<div class="archive-song">
                        <h1 class="game">${song.game}</h1>
                        <a class="cover-link" target="_blank" href="${song.link}">${song.title}</a>
                        <div class="cover-info">
                            <p>${song.desc}</p>
                        </div>
                    </div>`
}
renderGames(games)
function copyShortlink(event){
    if (event.target.className == 'cover-link')
        event.preventDefault()
        copyHandler(event.target.href)
}
function copyHandler(url){
    for (let i = 0; i < games.length; i++){
        for (let j = 0; j < games[i].songs.length; j++){
            let bigurl = games[i].songs[j].link;
            if (bigurl == url){
                navigator.clipboard.writeText(games[i].songs[j].shortlink)
            }
        }
    }
}
const songlist = document.querySelector("#songlist-archive")
songlist.addEventListener("contextmenu", copyShortlink)