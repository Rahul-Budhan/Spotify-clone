console.log('Welcome to Private Spotify');

//Initalize the Variables
let songIndex = 0;
let audioElement = new Audio('aud/Aisay Kaisay.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let coverImage = document.getElementById('coverImage');
let mainTitle = document.getElementById('mainTitle');
let count = 0;
let repeat = false;
let repeatElm = document.getElementById("repeat");
let shuffle = false;
let shuffleElm = document.getElementById('shuffle');
let songItems = Array.from(document.getElementsByClassName('songItem'))
let songs = [
    { songName: "Aisay Kaisay", filePath: "aud/Aisay Kaisay.mp3", coverPath: "img/covers/1.png" },
    { songName: "Choo Lo", filePath: "aud/Choo Lo.mp3", coverPath: "img/covers/2.png" },
    { songName: "Deewana Hai Dekho", filePath: "aud/Deewana Hai Dekho.mp3", coverPath: "img/covers/3.png" },
    { songName: "Kahaani", filePath: "aud/Kahaani.mp3", coverPath: "img/covers/4.png" },
    { songName: "Khwab", filePath: "aud/Khwab.mp3", coverPath: "img/covers/5.png" },
    { songName: "Kya Karein", filePath: "aud/Kya Karein.mp3", coverPath: "img/covers/6.png" },
    { songName: "Rihaee", filePath: "aud/Rihaee.mp3", coverPath: "img/covers/7.png" },
    { songName: "Shehron Ke Raaz", filePath: "aud/Shehron Ke Raaz.mp3", coverPath: "img/covers/8.png" },
    { songName: "Tere Hawaale", filePath: "aud/Tere Hawaale.mp3", coverPath: "img/covers/9.png" },
    { songName: "Tere Hi Hum", filePath: "aud/Tere Hi Hum.mp3", coverPath: "img/covers/10.png" },
    { songName: "Udh Chaliye", filePath: "aud/Udh Chaliye.mp3", coverPath: "img/covers/11.png" },
    { songName: "You Are My Soniya", filePath: "aud/You Are My Soniya.mp3", coverPath: "img/covers/12.png" },
];
let songIndexing = [
    "Aisay Kaisay", "Choo Lo", "Deewana Hai Dekho", "Kahaani", "Khwab", "Kya Karein", "Rihaee", "Shehron Ke Raaz", "Tere Hawaale", "Tere Hi Hum", "Udh Chaliye", "You Are My Soniya"
]



songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerHTML = songs[i].songName;
})

//Handle play/pause click
if (count >= 0) {
    console.log(songs)
}
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        console.log("Playing")
        if (count == 0) { count += 1; }
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        console.log("Paused")
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', () => {
    //update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
    //------------------Play next song if song ended--------------//
    if (progressBar.value >= 99){
        if(repeat == false){
            if (songIndex >= 11) {
                songIndex = 0;
            }
            else {
                if (shuffle ==true){
                    x = Math.random(1,5);
                }
                else{
                    x = 1;
                }
                songIndex += x;
                if (songIndex >= 11){
                    songIndex%=11;
                }
            }
        }
        audioElement.src = songs[songIndex].filePath;
        coverImage.src = songs[songIndex].coverPath;
        mainTitle.innerText = songs[songIndex].songName;
        audioElement.play();
    }
    })

progressBar.addEventListener('change', () => {
    audioElement.currentTime = ((progressBar.value * audioElement.duration) / 100);
})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


// --------------Play song from list ------------------//
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        index = (e.target.id)
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        console.log('aud/' + index + '.mp3');
        audioElement.src = 'aud/' + index + '.mp3';
        songIndex = songIndexing.indexOf(index)
        audioElement.currentTime = 0;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
        coverImage.src = songs[songIndex].coverPath;
        mainTitle.innerText = songs[songIndex].songName;
        audioElement.play();
    })
})

//-------------Repeat on and off------------------------------------//
document.getElementById('repeat').addEventListener('click',()=>{
    if (repeat == false){
        repeat = true;
        repeatElm.style.color = '#3df03d';
    }
    else{
        repeat = false;
        repeatElm.style.color = '#fff';
    }
    console.log("message")
})
//-------------Shuffle on and off------------------------------------//
document.getElementById('shuffle').addEventListener('click',()=>{
    if (shuffle == false){
        shuffle = true;
        shuffleElm.style.color = '#3df03d';
    }
    else{
        shuffle = false;
        shuffleElm.style.color = '#fff';

    }
    console.log("Shuffle");
})
// -----------Next Song--------------//
document.getElementById('next').addEventListener('click', () => {
    console.log("Next Song Played")

    if (songIndex >= 11) {
        songIndex = 0;
    }
    else {
        if (shuffle ==true){
            x = Math.ceil( Math.random(1,11) * 10);
            console.log(x)
        }
        else{
            x = 1;
        }
        songIndex += x;
        if (songIndex >= 11){
            songIndex%=11;
        }
    }
    audioElement.src = songs[songIndex].filePath;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
    coverImage.src = songs[songIndex].coverPath;
    mainTitle.innerText = songs[songIndex].songName;
    audioElement.play();
})

// ---------------Previous Song-----------------//
document.getElementById('previous').addEventListener('click', () => {
    console.log("Previous Song Played")
    if (audioElement.currentTime > 10) {
        audioElement.currentTime = 0;
    }
    else {
        if (songIndex <= 0) {
            songIndex = 11;
        }
        else {
            songIndex -= 1;
        }
        console.log(songIndex)
        audioElement.src = songs[songIndex].filePath;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
        coverImage.src = songs[songIndex].coverPath;
        mainTitle.innerText = songs[songIndex].songName;
        audioElement.play();
    }
})

