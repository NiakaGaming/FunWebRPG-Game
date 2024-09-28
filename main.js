player = {
    stats: {
        strenght: 0,
        dexterity: 0,
        intelligence: 0,
        constitution: 0,
        // luck: 0,
        attack: 0,
        speed: 0,
        defense: 0,
        // magicDefense: 0,
        level: 1,
        experience: 0,
        hp: 1,
        // mp: 0,
    },
    gear: {
        weapon: "wooden sword",
        secondHand: "wooden shield",
    },
    items: [
        "minor health potion",
    ]
}

levels = {
    1: 25,
    2: 50,
    3: 100,
    4: 200,
    5: 400,
    6: 800,
    7: 1600,
    8: 3200,
    9: 6400,
    10: 12800,
}

// BUTTONS
const buttonContinue = document.getElementsByClassName("continuePlayer")[0];
const buttonNew = document.getElementsByClassName("newPlayer")[0];
const buttonQuit = document.getElementsByClassName("quit")[0];
// PANELS
const playPanel = document.getElementsByClassName("play")[0];
const startPanel = document.getElementsByClassName("start")[0];


buttonContinue.addEventListener("click", (e) => {
    playPanel.style = "display:flex";
    startPanel.style = "display:none";
});
buttonQuit.addEventListener("click", (e) => {
    playPanel.style = "display:none";
    startPanel.style = "display:block";
});
