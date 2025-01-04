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
        hp: 100,
        maxHp: 100,
        // mp: 0,
    },
    gear: {
        weapon: "wooden sword",
        secondHand: "wooden shield",
    },
    items: [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
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

// START BY PUTTING ALL INFOS AT THE RIGHT PLACE
window.onload = function () {
    characterLevel.textContent = player.stats.level;
    characterExp.textContent = player.stats.experience + " / " + levels[player.stats.level];
    characterHpBar.textContent = player.stats.hp + " / " + player.stats.maxHp;
};

// BUTTONS
const buttonContinue = document.getElementsByClassName("continuePlayer")[0];
const buttonNew = document.getElementsByClassName("newPlayer")[0];
const buttonQuit = document.getElementsByClassName("quit")[0];
const buttonHunt = document.getElementsByClassName("buttonHunt")[0];
const buttonCloseHunt = document.getElementsByClassName("buttonCloseHunt")[0];
// PANELS
const playPanel = document.getElementsByClassName("play")[0];
const startPanel = document.getElementsByClassName("start")[0];
const huntResult = document.getElementsByClassName("huntResult")[0];
// CHARACTER STATS PALCEHOLDER
const characterLevel = document.getElementsByClassName("characterLevel")[0];
const characterExp = document.getElementsByClassName("characterExp")[0];
const expMax = document.getElementsByClassName("expMax")[0];
const characterHpBar = document.getElementsByClassName("characterHpBar")[0];
const hpMax = document.getElementsByClassName("hpMax")[0];

// CHANGE FROM START TO PLAY PANELS
buttonContinue.addEventListener("click", (e) => {
    playPanel.style = "display:flex";
    startPanel.style = "display:none";
});
buttonQuit.addEventListener("click", (e) => {
    playPanel.style = "display:none";
    startPanel.style = "display:block";
});


buttonHunt.addEventListener("click", (e) => {
    if (huntResult.style.visibility != "visible" || huntResult.style.visibilityvisibility == "") {
        huntResult.style = "visibility:visible"

        // ADD EXPERIENCE PER HUNT
        fight();
        getExp();
    }

});
buttonCloseHunt.addEventListener("click", (e) => {
    if (huntResult.style.visibility == "visible") {
        huntResult.style = "visibility:hidden"
    }
});

function getExp() {
    player.stats.experience += 10;
    if (player.stats.experience >= levels[player.stats.level]) {
        player.stats.level += 1;
        characterLevel.textContent = player.stats.level;
    }
    characterExp.textContent = player.stats.experience + " / " + levels[player.stats.level];
    expMax.style.width = (player.stats.experience / levels[player.stats.level]) * 100 + "%";
}

function fight() {
    const random = Math.floor(Math.random() * 10);
    player.stats.hp -= random;
    characterHpBar.textContent = player.stats.hp + " / " + player.stats.maxHp;
    hpMax.style.width = (player.stats.hp / player.stats.maxHp) * 100 + "%";

    // If maxHp <= 0 THEN DEAD
}

// ADD AN ITEM WHEN "F" IS PRESSED
// minor health potion
addEventListener("keypress", (e) => {
    if (e.key == "f" && playPanel.style.display == "flex") {
        // Add item in DB
        // Check available space in inventory and add item if empty
        let newIndex = -1;
        let isEmpty = true;
        player.items.forEach((element, index) => {
            if (element == "" && isEmpty == true) {
                newIndex = index;
                isEmpty = false;
            }
        });

        // If newIndex != -1 (if not full) => add items in the right place in DB
        // And add it in the right place in inventory
        let newItem = document.getElementsByClassName("inv-" + newIndex)[0];

        if (newIndex != -1 && !newItem.hasChildNodes()) {
            player.items[newIndex] = "minor health potion";
            // Create HTML Visual
            // Item index == Inventory place
            newItem.appendChild(document.createElement("img"));

            newItem.childNodes[0].classList.add("inv-item");
            newItem.childNodes[0].src = "./Assets/16x16 RPG Item Pack/Item__28.png";
        }
        else {
            console.log("Inventory Full");
        }
    }
});
