let electron = require("electron")

let discord = electron.remote.require("discord-rpc")
let clientId = "620780964494442500"

// dynamyc's section
let currentRawMode = "easy"
let currentMode = "Easy"
let currentScore = "0"
let username = null
let preUsername = document.querySelector("input#loginUsername").value //will replace with cache once caching logins work

if (preUsername == "") {
    username = "null"
} else {
    username = preUsername
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

const fs = require('fs');
const clientID = JSON.parse(fs.readFileSync(__dirname + "/scripts/electron/discordID.json", "utf-8")).clientId
let path  = require("path")

discord.register(clientId)

const rpc = new discord.Client({
    transport: "ipc"
})

rpc.login({
    clientId: clientId
})

//Updating the RPC on certain stuff
//WARNING: Really fucking spaghetti
window.addEventListener("g4statechange", (e) => {
    let modeAlias = {
        easy: "Easy",
        normal: "Normal",
        hard: "Hard",
        hell: "Hell",
        hades: "Hades",
        denise: "Chaos",
        reverse: "Reverse",
        nox: "Nox"
    }
    currentMode = modeAlias[e.detail.mode]
    currentScore = e.detail.levelIndex
    currentRawMode = [e.detail.mode]

    if(username != "null") {
        let activityData = {
            details: "Playing on: " + currentMode,
            state: "Score: " + currentScore,

            largeImageKey: "g4" + currentRawMode,
            largeImageText: "Currently playing as " + username + "!",
            smallImageKey: "g4",

            instance: false
        }
    }else{
        let activityData = {
            details: "Playing on: " + currentMode,
            state: "Score: " + currentScore,

            largeImageKey: "g4" + currentRawMode,
            largeImageText: "Not logged in yet.",
            smallImageKey: "g4",

            instance: false
        }
    }

    rpc.setActivity(activityData)

})
window.addEventListener("g4login", (e) => {
    //Update username
    preUsername = e.detail.username
    if (preUsername == "") {
        username = "null"
    } else {
        username = preUsername
    }
    let activityData = {
        details: "Playing on: " + currentMode,
        state: "Score: " + currentScore,

        largeImageKey: "g4" + currentRawMode,
        largeImageText: "Currently playing as " + username + "!",
        smallImageKey: "g4",

        instance: false
    }

    rpc.setActivity(activityData)
})
window.addEventListener("g4logout", (e) => {
    //Update username
    username = "null"
    
    let activityData = {
        details: "Playing on: " + currentMode,
        state: "Score: " + currentScore,

        largeImageKey: "g4" + currentRawMode,
        largeImageText: "Not logged in yet.",
        smallImageKey: "g4",

        instance: false
    }

    rpc.setActivity(activityData)
})

// END
// OF
// THIS
// SHITTY
// PART




function setRPC() {

    let rpcLoadStrings = [
        'Getting things ready!',
        'Tidying up a bit...',
        'Now loading...',
        'discord.gg/BKB4ft2',
        'Be sure to leave a like, sis',
        'Merry sissmass!',
        'Meow',
        'get.Ready();',
        'Shoot your balls into the air'
    ]
    let rpcLoadRNDNMBR = Math.floor(Math.random()*rpcLoadStrings.length);

    let activityData = {

        details: "Loading...",
        state: rpcLoadStrings[rpcLoadRNDNMBR],

        largeImageKey: "g4_logo",
        largeImageText: "Not logged in yet.",
        smallImageKey: "g4",

        instance: false
    }
    
    rpc.setActivity(activityData)
}

sleep(300)
setRPC()

