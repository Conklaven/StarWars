let btn = document.getElementById("btn");
let startAudio = new Audio("StarWars.mp3");
let play = document.getElementById("play");
let scroll = document.getElementById("scroll")
let fade = document.getElementById("fade")
let display = document.getElementById("result")

play.addEventListener("click", event => {

    startAudio.volume = 0.2;
    startAudio.play();
    scroll.style.display = "block";
    fade.style.display = "block";
    display.style.width = "100%";
    display.style.border = "none";
    display.style.height = "450px"

});
let sounds = [
    "http://www.waveevents.com/MyFilez/wavs/starwars/r2d2n1.wav",
    "http://www.slspencer.com/Sounds/Star%20Wars/Mouse%20Droid/chat1.wav",
    "http://confrerie.cz.free.fr/cstrike/sound/tiekillsx.wav",
    "http://www.galaxyfaraway.com/Sounds/chewyR2D2.wav",
    "http://www.galaxyfaraway.com/Sounds/JABBALAF.WAV",
    "http://waveevents.com/MyFilez/wavs/starwars/sentnc20.wav",
       "badfeeling.mp3",
       "Iamyourfather.mp3",
    "http://www.frontiernet.net/~gmills/sounds/VBREATH.wav",
    "http://www.foxysite.de/StarWars/HAN02.WAV",
    "http://galactic-voyage.com/Sounds/falcon.wav",
    "http://waveevents.com/MyFilez/wavs/starwars/litesabr.wav",
    "http://www.galaxyfaraway.com/Sounds/YODA3.WAV",
    "http://www.slspencer.com/Sounds/Star%20Wars/Mouse%20Droid/gen3.wav",
    "http://galactic-voyage.com/Sounds/r2d2.wav",
       "darkside.mp3",
       "badfeeling.mp3",
       "Iamyourfather.mp3",


]
async function runFetch() {
    let num = Math.floor(Math.random() * 60) + 1;
    loadingImage()
    let fetched = await fetch(`https://www.swapi.tech/api/people/${num}`)
    let response = fetched.json();
    return response
}

btn.addEventListener("click", start)

function start() {
    runFetch()
        .then(next => {
            let ID = next.result.uid
            let array = ["name", "height", "gender", "birth_year"]
            let name = document.createTextNode(next.result.properties.name)
            let height = document.createTextNode(next.result.properties.height)
            let gender = document.createTextNode(next.result.properties.gender)
            let birth_year = document.createTextNode(next.result.properties.birth_year)
            homeWorld(next.result.properties.homeworld)
                .then(world => {
                    let characterHomeworld = document.createTextNode(world.result.properties.name)
                    getImage(characterHomeworld, ID)
                        .then(world => {
                            console.log(world.status)
                            // if (world.status != 200){
                            //     console.log(world.status)
                            // } else {
                            let url = world.image
                            let array = {
                                "Name": name.data,
                                "Height": height.data,
                                "Gender": gender.data,
                                "Birth Year": birth_year.data,
                                "Home": characterHomeworld.data
                            }
                            insert(array, url)
                        
                        })
                })
        })
}

function loadingImage() {
    scroll.style.display = "none";
    fade.style.display = "none";
    display.style.width = "35%";
    display.style.border = "5px solid #e4b300";
    display.style.height = "470px"
    loading.innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i> <p>Loading...</p>';
    loading.style.marginTop = "90px"
    let array = ["Name", "Height", "Home", "Birth Year", "Gender", "Chimage"];
    array.forEach(e => {
        let div = document.getElementById(e)
        div.innerHTML = ""
    })
    let length = parseInt(sounds.length)
    let num = Math.floor(Math.random() * (length - 1));
    startAudio.pause();
    let audio = new Audio(sounds[num]);
    audio.play();
}

async function homeWorld(api) {
    let characterHomeworld = await fetch(api)
    let response = characterHomeworld.json();
    return response
}

function insert(a, url) {
    loading.innerHTML = ""
    loading.style.marginTop = "0px"
    let parent = document.getElementById("result")

    for (let key in a) {
        let section = document.getElementById(`${key}`)
        section.append(`${key} : ${a[key]}`)
        parent.appendChild(section)
    }
    image = document.createElement('img')
    image.setAttribute("id", "chimage")
    image.setAttribute("src", url)
    image.style.height = "200px"
    let imagecontain = document.getElementById("Chimage")
    imagecontain.appendChild(image)

}



async function getImage(home, id) {
    let fetched = await fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`)
    let response = fetched.json();
    return response
}