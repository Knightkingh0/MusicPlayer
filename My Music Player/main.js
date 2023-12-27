const songs=document.querySelector("audio");
const img=document.querySelector("img");
const play=document.getElementById("play");
const singer =document.getElementById("singer");
const song=document.getElementById("song");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
let progress= document.getElementById("progress");
let totalDuration =document.getElementById("duration");
let CurrentTime= document.getElementById("currentTime");
const progressArea=document.getElementById("progressArea");
const music=[
    { 
        name:"song1",
        song:"Agar-Tum-Mil-Jao",
        singer:"Shreya Ghoshal", 
    },
    {
        name:"song2",
        song:"Biodata-Paradox",
        singer:"Paradox",
    },
    {
        name:"song3",
        song:"Bol-Do-Na-Zara",
        singer:"Armaan Malik", 
    },
    {
        name:"song4",
        song:"Dil-Hai-Chota-Sa",
        singer:"A-R Rehman",  
    },
    {
        name:"song5",
        song:"Dil-To-Pagal-Hai",
        singer:"Udit-Narayan and Lata-Mangeshkar",
    },
    {
        name:"song6",
        song:"Kar-Har-Maidan-Fateh",
        singer:"Shreya Ghoshal and Sukhwinder Singh.",
    },
    {
        name:"song7",
        song:"Tujhse-Naraz-Nahi-Zindagi",
        singer:"Anup Ghoshal and Lata-Mangeshkar",
    },
    {
        name:"song8",
        song:"Tu-Pyar-Hai-Kisi-Aur-Ka",
        singer:"Anuradha Paudwal and Kumar Sanu",

    },
];
let isplaying=false;
//for play function
const playsongs=()=>{
    isplaying=true;
    songs.play();
    play.classList.replace('fa-play',"fa-pause");
};
//for pause function
const pausesongs=()=>{
    isplaying=false;
    songs.pause();
    play.classList.replace('fa-pause',"fa-play"); 
};
play.addEventListener('click',()=>{
   isplaying ? pausesongs():playsongs();
})
// changing the music data 
const loadtune= (music) => {
    song.textContent=music.song;
    singer.textContent=music.singer;
    songs.src="songs/" + music.name + ".mp3";
    img.src ="images/" + music.name+ ".jpg";
};
songIndex = 0;

const nextSong=()=>{
    songIndex=(songIndex+1)%music.length;
    loadtune(music[songIndex]);
    playsongs();
};
const prevSong=()=>{
    songIndex=(songIndex-1)%music.length
    loadtune(music[songIndex]);
    playsongs();
};
songs.addEventListener('timeupdate',(event)=>{
    // console.log(event);
    const {currentTime,duration}=event.srcElement;
    let progressTime=(currentTime/duration)*100;
    // console.log(progress);
    progress.style.width=`${progressTime}%`;
      //  total duration
    let minDuration =Math.floor(duration/60);
    let secDuration =Math.floor(duration%60);
    if(minDuration<10)
    {
        minDuration=`0${minDuration}`;
        
    }
    if(secDuration<10)
    {
        secDuration=`0${secDuration}`;
    }
    let tolTime=`${minDuration}:${secDuration}`;
    if(duration){
     totalDuration.textContent=tolTime;
    }
    //current time
    let minCurrentTime =Math.floor(currentTime/60);
    let secCurrentTime =Math.floor(currentTime%60);
   
    if(minCurrentTime<10)
    {
        minCurrentTime=`0${minCurrentTime}`;
       
    }
    if(secCurrentTime<10){
        secCurrentTime=`0${secCurrentTime}`;
    }
    let minTime=`${minCurrentTime}:${secCurrentTime}`;
    if(currentTime){
     CurrentTime.textContent=minTime;
    }
});
progressArea.addEventListener("click", (event)=>{
    const {duration}=songs;
    let moveProgress=(event.offsetX/event.srcElement.clientWidth)*duration;
    // console.log(moveProgress);
    songs.currentTime=moveProgress;
     
});
songs.addEventListener("ended",nextSong);
next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);