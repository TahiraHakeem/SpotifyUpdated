const cssProperties = {
    primary: "--primary",
    secondary: "--secondary",
    tertiary: "--tertiary",
    accent: "--accent",
    bgGray: "--bg-gray",
    bgGrayDark: "--bg-gray-dark",
    contentPrimary: "--content-primary",
    audioProgress: "--audio-progress",
    volumeProgress: "--volume-progress",
};

class Mp3PLayer {
    root;
    // Audio
    audio;
    playBtn;
    pauseIcon;
    playIcon;
    nextIcon;
    prevIcon;
    isPlaying;
    duration;
    durationElem;
    songProgressElem;
    currentTime;
    audioProgress;
    volumeProgress;
    // 
    navLink;
    main;
    indexTrack;
    songsLibraryELem;
    musicList;
    // Song object
    songList;
    songImage;
    songTitle;
    artist;
    // 
    constructor() {
        this.songList = [{
            songName: "Dendalions",
            path: "./assets/audio/Dandelions.mp3",
            img: "./assets/songImages/dendalions.webp",
            singer: " Ruth b"
        },
        {
            songName: "Bad Blood",
            path: "./assets/audio/Bad-Blood.mp3",
            img: "./assets/songImages/badBlood.jpg",
            singer: "Taylor Swift"
        },
        {
            songName: "Yaar-e-Maan",
            path: "./assets/audio/Yar-e-Man Original.mp3",
            img: "./assets/songImages/28.jpg",
            singer: "KamranAhmed"
        },
        ];
        this.indexTrack = 0;
        this.isPlaying = false;
        this.audioProgress = 0;
        this.isAudioProgressSelected = false;
        this.root = document.documentElement;
        this.pauseIcon = "ri-pause-line";
        this.playIcon = "ri-play-fill";
        // <-------- element selectors ------------->
        this.audio = document.querySelector("#audio-play");
        this.playBtn = document.querySelector("#play-icon");
        this.prevIcon = document.querySelector("#previous");
        this.nextIcon = document.querySelector("#next");
        this.audioProgress = document.querySelector(".audioProgress");
        this.durationElem = document.querySelector("#duration");
        this.songProgressElem = document.querySelector("#currentTime");
        this.navLink = document.querySelectorAll(".navLink");
        this.main = document.querySelector("#main");
        this.songImage = document.querySelector("#songImg");
        this.songTitle = document.querySelector("#title");
        this.artist = document.querySelector("#artist");
        this.songsLibraryELem = document.querySelector("#library");
        // this.musicList = document.querySelector(".musiclist");

        // <-------- bind methods ------------->
        // this.onPlayButtonHandler = this.onPlayButtonHandler.bind(this);
        this.songsLibraryELem.innerHTML = this.librarySongCards.bind(this.songList);
        this.play = this.play.bind(this);
        this.setPlayIcon = this.setPlayIcon.bind(this);
        this.setStopIon = this.setStopIon.bind(this);
        this.menu = this.menu.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.prevSong = this.prevSong.bind(this);
        this.songTrack = this.songTrack.bind(this);
        this.loadeddata = this.loadeddata.bind(this);
        // this.librarySong = this.librarySong.bind(this);
        // this.librarySongCards = this.librarySongCards.bind(this)
        // <-------- event listener ------------->
        this.playBtn.addEventListener("click", this.play);
        this.nextIcon.addEventListener("click", this.nextSong);
        this.prevIcon.addEventListener("click", this.prevSong);
        // this.musicList.addEventListener("click", this.librarySong);

        this.audioProgress.addEventListener(
            "change",
            this.onAudioProgressChangeHandler
        );
        this.audio.addEventListener("loadeddata", this.loadeddata);
        this.songsLibraryELem.innerHTML = this.librarySongCards(this.songList);
        this.duration = this.audio.duration;
        this.currentTime = this.audio.currentTime;
        this.root.style.setProperty(cssProperties.audioProgress, this.currentTime);
        this.menu();
        // this.librarySong();
    }


    // Navlink Function
    menu() {
        for (let i = 0; i < this.navLink.length; i++) {
            const navElem = this.navLink[i];
            navElem.addEventListener("click", () => {
                switch (i) {
                    case 0:
                        this.navLink[0].classList.add("active");
                        this.navLink[1].classList.remove("active");
                        this.navLink[2].classList.remove("active");
                        this.main.innerHTML = this.mainComponent();
                        // this.main.innerHTML = home();
                        break;

                    case 1:
                        this.navLink[0].classList.remove("active");
                        this.navLink[1].classList.add("active");
                        this.navLink[2].classList.remove("active");
                        // this.main.innerHTML = trend();
                        this.main.innerHTML = this.trendComponent();
                        break;
                    case 2:
                        this.navLink[0].classList.remove("active");
                        this.navLink[1].classList.remove("active");
                        this.navLink[2].classList.add("active");
                        this.main.innerHTML = this.searchComponent();
                        break;
                }
            });
        }
    }
    formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
            .filter((a) => a)
            .join(":");
    }

    setPlayIcon() {
        const playClassList = this.playBtn.children[0].classList;
        playClassList.remove(this.playIcon);
        playClassList.add(this.pauseIcon);
    }

    setStopIon() {
        const playClassList = this.playBtn.children[0].classList;
        playClassList.remove(this.pauseIcon);
        playClassList.add(this.playIcon);
    }
    play() {
        if (this.isPlaying) {
            this.setStopIon();
            this.audio.pause();
            this.isPlaying = false;
        } else {
            this.setPlayIcon();
            this.audio.play();
            this.isPlaying = true;
        }

    }
    // setAudioProgress(timer) {
    //     this.root.style.setProperty(cssProperties.audioProgress, `${timer}%`);
    // }
    // onAudioTimeUpdateHandler(track) {
    //     const progressPercent = parseInt(
    //         (track.target.currentTime / this.duration) * 100
    //     );
    //     this.setAudioProgress(progressPercent);
    //     this.root.style.setProperty(cssProperties.audioProgress, `${progressPercent}%`)
    //     this.audioProgress.value = progressPercent;
    //     this.songProgressElem.innerHTML = this.formatTime(track.target.currentTime);
    // }
    // pause() {
    //     this.setStopIon();
    //     this.audio.pause();
    //     this.isPlaying = false;
    // }

    // onAudioProgressChangeHandler(event) {
    //     const currentTime = event.target.value;
    //     let audioTrackTime = (currentTime / 100) * this.duration;
    //     this.audio.currentTime = audioTrackTime;
    //     this.root.style.setProperty(
    //         cssProperties.audioProgress,
    //         `${audioTrackTime}%`
    //     );
    // }
    loadeddata() {
        this.duration = this.audio.duration;
        this.duration = this.formatTime(this.audio.duration)
        this.durationElem.textContent = this.duration;
    }
    // load track
    songTrack(indexTrack) {
        this.audio.src = this.songList[this.indexTrack].path;
        this.songImage.src = this.songList[this.indexTrack].img;
        this.songTitle.innerHTML = this.songList[this.indexTrack].songName;
        this.artist.innerHTML = this.songList[this.indexTrack].singer;
        this.audio.load();
        this.playBtn.children[0].classList.add(this.playIcon);
        this.playBtn.children[0].classList.remove(this.pauseIcon);
        this.audio.play();
        // playSong();
    }
    nextSong() {
        if (this.indexTrack < this.songList.length - 1) {
            this.isPlaying = false;
            this.indexTrack++;
            this.songTrack(this.indexTrack);
            this.play();
        } else {
            this.isPlaying = false;
            this.indexTrack = 0;
            this.songTrack(this.indexTrack);
            this.play();
        }
    }
    prevSong() {

        if (this.indexTrack > 0) {
            this.isPlaying = false;
            this.indexTrack--;
            this.songTrack(this.indexTrack);
            this.play();
        } else {
            this.isplaying = false;
            this.indexTrack = this.songList.length - 1;
            this.songTrack(this.indexTrack);
            this.play();
        }
    }
    // pages
    trendComponent() {
        const hitsOfWeek = `
        <div class="greet title">
        <h3>hits </h3>
        <h3>of the week</h3>
    </div>`;

        const hitsOfMonth = `
        <div class="greet">
                        <h3>hits </h3>
                        <h3>of the month</h3>
                    </div>
      `;
        const userPlaylistCard =
            `<div>
            <img src="assets/songImages/28.jpg" alt="">
            <div>
                <h3>Baba</h3>
                <p>Lvbel C5</p>
            </div>
        </div>`;
        const userPlayList = `
        <section class="hits">
      ${userPlaylistCard}
      ${userPlaylistCard}
      ${userPlaylistCard}
      ${userPlaylistCard}
      ${userPlaylistCard}
      </section>`;
        const trendResult = `
        <div>
        ${hitsOfWeek}
        ${userPlayList}
        ${hitsOfMonth}
        ${userPlayList}
        ${hitsOfMonth}
        ${userPlayList} 
        </div>`
        return trendResult;
    }

    mainComponent() {
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

    searchComponent() {
        const resultCard = `
              <div class="result-card">
              <div>
                  <img src="./assets/songImages/Cruel_Summer.webp" alt="">
                  <h4>Cruel Summer</h4>
              </div>
              <p>Taylor Swift</p>
              <p>1.1B Plays</p>
              <p>2:36</p>
            </div>
              `;

        const artistCard = `<div class="artist-card">
              <img src="./assets/songImages/Cruel_Summer.webp" alt="">
              <h4 class="artist-name">Taylor Swift</h4>
  
              <div class="artist-tag">
                  <span>artist</span>
              </div>
            </div>`;

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

        const result = `<div class="search-results">
                  <section>
                      <p class="title">Search Result</p>
                      <div class="search-result-container">
                     ${resultCard}
                        ${resultCard}
                        ${resultCard}
                        ${resultCard}
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
                ${artistCard}
                ${artistCard}
                ${artistCard}
                  </div>
                </div>
                `;

        return result;
    };
    librarySongCards(arr) {
        let result = "";
        for (let i = 0; i < arr.length; i++) {
            result += `
            <div  data - ${i} class="musiclist">
            <div>
                <div class="music">
                    <img src="${arr[i].img} " alt="" height="72px" width="72px">
                </div>
                <div class="head1">
                    <h5 id="songName">${arr[i].songName}</h5>
                    <p>${arr[i].singer}</p>
                </div>
            </div>
            <div class="icon">
                <i class="ri-pushpin-fill"></i>
            </div>
        </div>
            `
        }

        return result;
    }
    addEventListeners(songsLibraryELem, songList) {
        for (let i = 0; i < songsLibraryELem.children.length; i++) {
            const songName = songsLibraryELem.children[i].querySelector("#songName").innerHTML;

            console.log(songName);
            const songIndex = songList.findIndex((songList) => songList.name === songName);
            songsLibraryELem.children[i].addEventListener("click", () => {
                songTrack(songIndex)
                // playSong(songIndex);
            });

        }
    }

    // async onPlayButtonHandler() {
    //     !this.isPlaying ? this.play() : this.pause();
    // }
}
console.log(this.librarySong);
const mp3Player = new Mp3PLayer();
