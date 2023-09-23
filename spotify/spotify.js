// Object in array
// song list
let songList = [{
    name: "Dendalions",
    path: "./assets/audio/Dandelions.mp3",
    img: "./assets/songImages/dendalions.webp",
    singer: " Ruth b"
},
{
    name: "Bad Blood",
    path: "./assets/audio/Bad-Blood.mp3",
    img: "./assets/songImages/badBlood.jpg",
    singer: "Taylor Swift"
},
{
    name: "Yaar-e-Maan",
    path: "./assets/audio/Yar-e-Man Original.mp3",
    img: "./assets/songImages/28.jpg",
    singer: "KamranAhmed"
},
];

// 
let duration = 0;
let indexTrack = 0;
let currentTime = 0;
// ---------Variables-------
const playIconElement = "ri-play-fill";
const pauseIconElement = "ri-pause-line";
let isplaying = false;

//-------------Elements
const root = document.documentElement;
const audioPlay = document.querySelector("#audio-play");
// 
const currentTimeElement = document.querySelector("#currentTime");
const durationElement = document.querySelector("#duration");
const songProgressElement = document.querySelector(".audioProgress");

// 
const playIcon = document.querySelector("#play-icon");
const prevIcon = document.querySelector("#previous");
const nextIcon = document.querySelector("#next");

// 
const songImage = document.querySelector("#songImg");
const songTitle = document.querySelector("#title");
const artist = document.querySelector("#artist");
const navLink = document.querySelectorAll(".navLink");
// 
const main = document.querySelector("#main");
const songsLibraryELem = document.querySelector("#library");
songsLibraryELem.innerHTML = librarySongCards(songList);

// const list = document.querySelector(".listSongs");
const button = document.querySelector("#btn");
button.addEventListener("click", ()=>{
    main.innerHTML = `<div class="listSongs" id="mixes">
    <div class="mixSongs">
        <div class="sec">
            <img src="assets/songImages/28.jpg" alt="" height="80px" width="80px">
            <div class="write">
                <p>24.06.23</p>
                <p>Hasancan Ozmen</p>
                <span>+348 songs</span>
            </div>
        </div>
        <div class="likes">
            <h5>3 likes</h5>
            <div class="avatars">
                <img src="assets/songImages/28.jpg" alt="">
                <img src="assets/songImages/28.jpg" alt="">
                <img src="assets/songImages/28.jpg" alt="">
            </div>
        </div>
    </div>
    <div class="search-results" id="div">
        <section>
            <div class="search-result-container" id="searrrrrch">
                <div class="result-card">
                    <div>
                        <img src="assets/songImages/29.jpg" alt="" />
                        <h4 id="name">koi</h4>
                    </div>
                    <p>popopo</p>
                    <p>1.1B Plays</p>
                    <p>2:36</p>
                </div>

                <div class="result-card">
                    <div>
                        <img src="assets/songImages/29.jpg" alt="" />
                        <h4 id="name">koi</h4>
                    </div>
                    <p>popo</p>
                    <p>1.1B Plays</p>
                    <p>2:36</p>
                </div>
                <div class="result-card">
                    <div>
                        <img src="assets/songImages/29.jpg" alt="" />
                        <h4 id="name">koi</h4>
                    </div>
                    <p>opop</p>
                    <p>1.1B Plays</p>
                    <p>2:36</p>
                </div>
            </div>
        </section>
    </div>
</div>`
} )

// const seacrhElem = document.getElementsByTagName("div");
// console.log(seacrhElem);

for (let i = 0; i < navLink.length; i++) {
    const navElem = navLink[i];
    navElem.addEventListener("click", () => {
        switch (i) {
            case 0:
                navLink[0].classList.add("active");
                navLink[1].classList.remove("active");
                navLink[2].classList.remove("active");
                main.innerHTML = home();
                break;

            case 1:
                navLink[0].classList.remove("active");
                navLink[1].classList.add("active");
                navLink[2].classList.remove("active");
                main.innerHTML = trend();
                break;
            case 2:
                navLink[0].classList.remove("active");
                navLink[1].classList.remove("active");
                navLink[2].classList.add("active");
                main.innerHTML = searchComponent();
                break;
        }
    });
}
// add event listeners
playIcon.addEventListener("click", playSong);
prevIcon.addEventListener("click", prevSong);
nextIcon.addEventListener("click", nextSong);
// songProgressElement.addEventListener("change", changeDuration);

// load track
function songTrack(indexTrack) {
    audioPlay.src = songList[indexTrack].path;
    songImage.src = songList[indexTrack].img;
    songTitle.innerHTML = songList[indexTrack].name;
    artist.innerHTML = songList[indexTrack].singer;
    audioPlay.load();
    playIcon.children[0].classList.add(playIconElement);
    playIcon.children[0].classList.remove(pauseIconElement);
    audioPlay.play();
    // playSong();
}

// next function
function nextSong() {
    if (indexTrack < songList.length - 1) {
        isplaying = false;
        indexTrack++;
        songTrack(indexTrack);
        playSong();
    } else {
        isplaying = false;
        indexTrack = 0;
        songTrack(indexTrack);
        playSong();
    }
}
// Previous Function
function prevSong() {
    isplaying = false;
    if (indexTrack > 0) {
        indexTrack--;
        songTrack(indexTrack);
        playSong();
    } else {
        isplaying = false;
        indexTrack = songList.length - 1;
        songTrack(indexTrack);
        playSong();
    }
}
// -------Function play song--------
function playSong() {
    if (isplaying) {
        playIcon.children[0].classList.add(playIconElement);
        playIcon.children[0].classList.remove(pauseIconElement);
        audioPlay.pause();
        isplaying = false;
    } else {
        playIcon.children[0].classList.remove(playIconElement);
        playIcon.children[0].classList.add(pauseIconElement);
        audioPlay.play();
        isplaying = true;
    }

}

// // load Function
audioPlay.addEventListener("loadeddata", () => {
    duration = audioPlay.duration;
    duration = formatTime(audioPlay.duration)
    durationElement.textContent = duration;
})

// //window load Function
window.addEventListener("load", (wind) => {
    const doc = wind.currentTarget.document;
    const audioPlay = document.querySelector("#audio-play");
    audioPlay.setAttribute("src", songList[0].path);
})
// Change Duration
// function changeDuration() {
//     let sliderPosition = audioPlay.duration * (songProgressElement.value / 100);
//     audioPlay.currentTime = sliderPosition;
// }

// time tracker
audioPlay.addEventListener("timeupdate", function (track) {
    const _currentTime = track.currentTarget.currentTime;
    currentTimeElement.textContent = formatTime(_currentTime);
    const currentTimePersentage = (_currentTime / duration) * 100;

    root.style.setProperty("--audioProgress", `${currentTimePersentage}%`);
    songProgressElement.value = currentTimePersentage;
    // const _currentTime = track.currentTarget.currentTime;
    // currentTimeElement.textContent = formatTime(_currentTime);

    // const timeInPercentage = (_currentTime / duration) * 100;
    // console.log(timeInPercentage);

    // --audio-progress
    // root.style.setProperty("--audioProgress", "_currentTime");
    // songProgressElement.value = _currentTime;
})

// Function Time Formation

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)

    return [h, m > 9 ? m : h ? "0" + m : m || '0', s > 9 ? s : '0' + s]
        .filter(a => a)
        .join(':')
}


// pages
const hitsOfWeek = `<div id="hit">
    <img src="assets/songImages/29.jpg" alt="">
    <div>
        <h3>Baba</h3>
        <p>Lvbel C5</p>
    </div>
</div>`;

// const idRegex = /id="([^"]+)"/;
// const idMatch = hitsOfWeek.match(idRegex);

// if (idMatch && idMatch.length > 1) {
//     const idValue = idMatch[1];
//     console.log('Extracted ID:', idValue);

//     const elementWithId = document.getElementById(idValue);
//     if (elementWithId) {
//         elementWithId.addEventListener("click", playSong);
//         console.log('Event listener added to the element with ID:', idValue);
//     } else {
//         console.log('No element found with the extracted ID:', idValue);
//     }
// }

// function playSong() {
//     console.log('Song is being played...');
// }


function trend() {
    let result = `<div>
    <div class="greet">
        <h3>hits </h3>
        <h3>of the week</h3>
    </div>
    <div class="hits">
        ${hitsOfWeek}
        ${hitsOfWeek}
        ${hitsOfWeek}
    </div>
    <div class="greet">
        <h3>hits </h3>
        <h3>of the month</h3>
    </div>
    <div class="hits">
        ${hitsOfWeek}
        ${hitsOfWeek}
        ${hitsOfWeek}
    </div>
    <div class="greet">
        <h3>best albums</h3>
        <h3>of the month</h3>
    </div>
</div>
`
    return result;
}

// --------------------
//      Home
// --------------------
function home() {
    const greeting = `<div class="greet">
                        <h3>Good evening</h3>
                        </div>`;
    const frequentlySongFisrt = `<div class="frequentlySongs">
    <div class="sec">
        <img src="assets/songImages/28.jpg" alt="" height="80px" width="80px">
        <div class="write">
            <p>24.06.23</p>
            <p>Hasancan Ozmen</p>
            <span>+348 songs</span>
        </div>
    </div>
    <div class="likes">
        <h5>241 likes</h5>
        <div class="avatars">
            <img src="assets/songImages/28.jpg" alt="">
            <img src="assets/songImages/28.jpg" alt="">
            <img src="assets/songImages/28.jpg" alt="">
            <img src="assets/songImages/28.jpg" alt="">
            <img src="assets/songImages/28.jpg" alt="">
            <p>
                <span>+</span>
                <span>236</span>
            </p>
        </div>
    </div>
</div>`
    const frequentlySongSec = `  <div class="frequentlySongs">
<div class="sec">
    <img src="assets/songImages/28.jpg" alt="" height="80px" width="80px">
    <div class="write">
        <p>24.06.23</p>
        <p>Hasancan Ozmen</p>
        <span>+348 songs</span>
    </div>
</div>
<div class="likes">
    <h5>3 likes</h5>
    <div class="avatars">
        <img src="assets/songImages/28.jpg" alt="">
        <img src="assets/songImages/28.jpg" alt="">
        <img src="assets/songImages/28.jpg" alt="">
    </div>
</div>
</div>`
    const compiledSongs = `<div class="compiled">
<span>Compiled for</span>
<span>Tahira Hakeem</span>
</div>`
    const DailyMix1 = `<div>
<div class="img">
<span><i class="ri-spotify-fill"
        style="position: absolute; left: 16px; z-index: 1; font-size: 28px;"></i>
    <svg viewBox="0 0 500 150" preserveAspectRatio="none"
        style="width: 100%; position:absolute;  border-top-left-radius: 12px;">
        <path
            d="M-2.59,59.54 C105.19,186.50 51.01,22.14 242.32,-1.47 L176.86,-3.44 L-0.00,0.00 Z"
            style="stroke: none; fill: #7FFFD4; opacity: 0.7; ">
        </path>
    </svg> </span>
<span><img src="assets/waves/aquaWave.svg" width="100%"
        style="position: absolute; opacity: 0.7;"></span>
<img src="assets/songImages/Cruel_Summer.webp" alt="">
</div>
<div class="headingImg">
<h1>Daily Mix 1</h1>
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
</div>
</div>`
    const DailyMix2 = ` <div>
    <div class="img">
        <span><i class="ri-spotify-fill"
                style="position: absolute;left:16px; z-index: 1; font-size: 28px;"></i>
            <svg viewBox="0 0 500 150" preserveAspectRatio="none"
                style="width: 100%; position:absolute; border-top-left-radius: 12px;">
                <path
                    d="M-2.59,152.06 C89.95,16.23 172.91,162.88 299.89,-0.49 L176.86,-3.44 L-0.00,0.00 Z"
                    style="stroke: none; fill: #F8BBD0; opacity: 0.7; "></path>
            </svg> </span>
        <span><img src="assets/waves/pinkWave.svg" width="100%"
                style="position: absolute;  opacity: 0.7;"></span>
        <img src="assets//waves/Habibi.webp" alt="">
    </div>
    <div class="headingImg">
        <h1>Daily Mix 2</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
    </div>
</div>`
    const DailyMix3 = `<div>
    <div class="img">
        <span><i class="ri-spotify-fill"
                style="position: absolute; left: 16px; z-index: 1; font-size: 28px;"></i>
            <svg viewBox="0 0 500 150" preserveAspectRatio="none"
                style="width: 100%; position:absolute; border-top-left-radius: 12px;">
                <path
                    d="M-0.90,156.00 C43.11,34.93 103.50,103.82 192.66,2.47 L176.86,-3.44 L-0.00,0.00 Z"
                    style="stroke: none; fill: #A9DFBF; opacity: 0.7;"></path>
            </svg> </span>
        <!-- <span>
            <p
                style="position: absolute; top: 200px; left: 30px; z-index: 1; font-size: 28px; font-weight: 600;">
                Daily Mix 3</p>
        </span> -->
        <span><img src="assets/waves/greenWave.svg" width="100%"
                style="position: absolute;  opacity: 0.7;"></span>
        <img src="assets/songImages/dendalions.webp" alt="">
    </div>
    <div class="headingImg">
        <h1>Daily Mix 3</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
    </div>
</div>`
    const DailyMix4 = `<div>
<div class="img">
    <span><i class="ri-spotify-fill"
            style="position: absolute; left: 16px; z-index: 1; font-size: 28px;"></i>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none"
            style="width: 100%; position:absolute; border-top-left-radius: 12px;">
            <path
                d="M-0.90,156.00 C96.16,-17.22 143.00,146.15 365.35,0.50 L164.44,-0.49 L-0.00,0.00 Z"
                style="stroke: none; fill: #CD6688; opacity: 0.7;"></path>
        </svg> </span>
    <!-- <span>
        <p
            style="position: absolute; top: 200px; left: 30px; z-index: 1; font-size: 28px; font-weight: 600;">
            Daily Mix 4</p>
    </span> -->
    <span><img src="assets/waves/pinkOne.svg" width="100%"
            style="position: absolute;  opacity: 0.6;"></span>
    <img src="assets/songImages/Cruel_Summer.webp" alt="">
</div>
<div class="headingImg">
    <h1>Daily Mix 4</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
</div>
</div>`
    const otherMusicHead = `<div class="otherMusic">
    <span>Other Music</span>
    <span>Similar to</span>
    <span>24.06.23</span>
</div>`;
    const otherMusics = `<div>
<div class="img">
<img src="assets/songImages/28.jpg" alt="">
</div>
<div class="headingImg">
<h1>Daily Mix 1</h1>
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
</div>
</div>`
    let homeResult = `
    ${greeting}
    <section>
        <div class="mainReaction">
            ${frequentlySongFisrt}
            ${frequentlySongSec}
        </div>
    </section>
    ${compiledSongs}
    <section>
        <div class="compiledSongs">    
        ${DailyMix1}
        ${DailyMix2}
        ${DailyMix3}
        ${DailyMix4}
            
        </div>
    </section>
    ${otherMusicHead}
    <section>
        <div class="compiledSongs">
            ${otherMusics}
            ${otherMusics}
            ${otherMusics}
            ${otherMusics}
        </div>
    </section>
`;
    return homeResult;
}

// --------------SearchComponentSongs---------------
// 
// for (let i = 0; i < value.children.length; i++) {
//     const songName =
//         id.children[i].querySelector("#name").innerHTML;
//     const searchSongIndex = searchSongs.findIndex((searchSongs) => searchSongs.name === songName);
//     id.children[i].addEventListener("click", () => {
//         songTrack(searchSongIndex)
//         // playSong(songIndex);
//     });
// }
// 
const searchSongs = [{
    name: "Dendalions",
    path: "./assets/audio/Dandelions.mp3",
    img: "./assets/songImages/dendalions.webp",
    singer: " Ruth b"
},
{
    name: "Bad Blood",
    path: "./assets/audio/Bad-Blood.mp3",
    img: "./assets/songImages/badBlood.jpg",
    singer: "Taylor Swift"
},
{
    name: "Yaar-e-Maan",
    path: "./assets/audio/Yar-e-Man Original.mp3",
    img: "./assets/songImages/29.jpg",
    singer: "KamranAhmed"
},
{
    name: "Shake it Off",
    path: "./assets/audio/Shake-It-Off.mp3",
    img: "./assets/songImages/shakeItOff.jpg",
    singer: "Taylor Swift"
},
{
    name: "Cruel Summer",
    path: "./assets/audio/CruelSummer.mp4",
    img: "./assets/songImages/Cruel_Summer.webp",
    singer: "Taylor Swift"
},]
function searchSongCards(arr) {
    let result = "";
    for (let i = 0; i < arr.length; i++) {
        result += `
         <div class="result-card" data-${i} id="${i}">
           <div>
             <img src="${arr[i].img}" alt="" />
             <h4 id="name">${arr[i].name}</h4>
           </div>
           <p>${arr[i].singer}</p>
           <p>1.1B Plays</p>
           <p>2:36</p>
         </div>
       `;
    }

    return result;
}
// -------------------------ArtistCard---------------
function artistName(arr) {
    let result = "";
    for (let i = 0; i < arr.length; i++) {
        result +=
            `<div class="artist-card">
          <img src="${arr[i].img}" alt="">
          <h4 class="artist-name">${arr[i].singer}</h4>

          <div class="artist-tag">
              <span>artist</span>
          </div>
        </div>`;
    }

    return result;
}
function searchComponent() {
    const resultCard =
        searchSongCards(searchSongs);
        ;
    const artistCard = artistName(searchSongs);

    const topResultCard = `  <div class="top-result-card">
<img src="./assets/songImages/Cruel_Summer.webp" alt="">
<h4>Cruel Summer</h4>
<p>Taylor Swift</p>
<div class="song-stats">
    <p>1.1B Plays</p>
    <p>2:36</p>
</div>
<div class="song-tags">
    <div>
        <span>song</span>
    </div>
    <div>
        <span>pop</span>
    </div>

</div>
</div>`;
// console.log(id);

    let result = `<div class="search-results" id="div">
              <section>
                  <p class="title">Search Result</p>
                  <div class="search-result-container" id="searrrrrch">
                  ${resultCard}
                  </div>
              </section>
              <section class="search-top-result">
                  <p class="title">top result</p>
                ${topResultCard}
              </section>
            </div>
            <div class="artist">
              <p class="title">Artist</p>
              <div class="artist-card-container">   
            ${artistCard}
            ${artistCard}
              </div>
            </div>
            `;
            return result;
};

// Library songs
for (let i = 0; i < songsLibraryELem.children.length; i++) {
    const songName =
        songsLibraryELem.children[i].querySelector("#songName").innerHTML;
    const songIndex = songList.findIndex((songList) => songList.name === songName);
    songsLibraryELem.children[i].addEventListener("click", () => {
        songTrack(songIndex)
        // playSong(songIndex);
    });

}
function librarySongCards(arr) {
    let result = "";
    for (let i = 0; i < arr.length; i++) {
        result += `
        <div  data - ${i} class="musiclist">
        <div>
            <div class="music">
                <img src="${arr[i].img} " alt="" height="72px" width="72px">
            </div>
            <div class="head1">
                <h5 id="songName">${arr[i].name}</h5>
                <p>${arr[i].singer}</p>
            </div>
        </div>
    </div>
        `
    }

    return result;
}
// 
