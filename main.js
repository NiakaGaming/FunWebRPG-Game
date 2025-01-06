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
    inventory: [
        "Minor health potion",
        "Minor health potion",
        "Minor health potion",
        "Major health potion",
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

items = [
    Minor_health_potion = {
        label: "Minor health potion",
        description: "Restore 20 HP",
        src: "./Assets/items/minor_health_potion.png",
        type: "potion",
        use: 20,
        chance: 15,
    },
    Major_health_potion = {
        label: "Major health potion",
        description: "Restore 50 HP",
        src: "./Assets/items/major_health_potion.png",
        type: "potion",
        use: 50,
        chance: 5,
    },
]

// START BY PUTTING ALL INFOS AT THE RIGHT PLACE
window.onload = function () {
    characterLevel.textContent = player.stats.level;
    characterExp.textContent = player.stats.experience + " / " + levels[player.stats.level];
    characterHpBar.textContent = player.stats.hp + " / " + player.stats.maxHp;

    // Create inventory visuals for existing inventory
    player.inventory.forEach((element, index) => {
        if (element != "") {
            items.forEach(elem => {
                if (elem.label == element) {
                    let newItem = document.getElementsByClassName("inv-" + index)[0];
                    createItem(newItem, elem.label, elem.src, elem.description);
                }
            });
        }
    });
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
// INVENTORY ITEMS
const inventory = document.getElementsByClassName("inventory")[0];

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
        getItemsLuck();
    }

});

// Close Hunt result Panel
buttonCloseHunt.addEventListener("click", (e) => {
    if (huntResult.style.visibility == "visible") {
        huntResult.style = "visibility:hidden"
    }
});

// Inventory item on Click
inventory.addEventListener("click", (e) => {
    if (e.target.tagName == "IMG") {
        // Get parent class (inv-x) to find the inventory index
        let itemParent = e.target.parentElement.classList[1],
            inventoryIndex = itemParent.charAt(itemParent.length - 1),
            itemToUse;

        // Find the item in the Items array and store it in itemToUse
        items.forEach(element => {
            if (element.label == player.inventory[inventoryIndex]) {
                itemToUse = element;
            }
        });

        // Find item's type (maybe use Switch method here)
        if (itemToUse.type == "potion") {
            // Add HP to DB
            player.stats.hp += itemToUse.use;
            if (player.stats.maxHp < player.stats.hp) {
                player.stats.hp = 100;
            }
            // Change HP visual 
            characterHpBar.textContent = player.stats.hp + " / " + player.stats.maxHp;
            hpMax.style.width = (player.stats.hp / player.stats.maxHp) * 100 + "%";

            // Remove item in DB
            player.inventory[inventoryIndex] = "";
            // Remove item visual (img & description)
            e.target.nextSibling.remove();
            e.target.remove();
        }
        else if (itemToUse.type == "buff") {

        }
    }
});

// Item Description move on mouse hover
inventory.addEventListener("mousemove", (e) => {
    let desc = e.target.nextSibling,
        descChilds = desc.childNodes;
    if (e.target.tagName == "IMG") {
        var x = e.clientX,
            y = e.clientY;
        desc.style.left = (x + 20) + "px";
        desc.style.top = (y + 20) + "px";

        // Check if Span is outside of viewport
        let rect = desc.getBoundingClientRect();
        // Span right side compared to viewport width
        if ((rect.right) > window.innerWidth) {
            desc.style.left = (x - desc.clientWidth - 10) + "px";
        }
        // More conditions (left side, top side, bottom side)
        // (rect.x + rect.width) < 0 || (rect.y + rect.height) < 0
        // (rect.x > window.innerWidth || rect.y > window.innerHeight)
    }
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// FUNCTIONS //
function getExp() {
    // Add Exp in DB
    player.stats.experience += 10;
    if (player.stats.experience >= levels[player.stats.level]) {
        player.stats.level += 1;
        characterLevel.textContent = player.stats.level;
    }
    // Change Exp visual 
    characterExp.textContent = player.stats.experience + " / " + levels[player.stats.level];
    expMax.style.width = (player.stats.experience / levels[player.stats.level]) * 100 + "%";
}

function fight() {
    // Randomize HP lost
    const random = Math.floor(Math.random() * 10);
    // Remove HP from DB
    player.stats.hp -= random;
    // Change HP visual 
    characterHpBar.textContent = player.stats.hp + " / " + player.stats.maxHp;
    hpMax.style.width = (player.stats.hp / player.stats.maxHp) * 100 + "%";

    // ----------------------- //
    // If maxHp <= 0 THEN DEAD //
    // ----------------------- //
}

// Check item's luck to see if it's droped
function getItemsLuck() {
    items.forEach(element => {
        if (element.chance >= Math.random() * 100) {
            itemDrop(element.label, element.src, element.description);
        }
    });
}

function itemDrop(itemLabel, itemSrc, itemDesc) {
    // Add item in DB
    // Check available space in inventory and add item if empty
    let newIndex = -1,
        isEmpty = true;
    player.inventory.forEach((element, index) => {
        if (element == "" && isEmpty == true) {
            newIndex = index;
            isEmpty = false;
        }
    });

    // If newIndex != -1 (if not full) => add items in the right place in DB
    // And add it in the right place in inventory
    let newItem = document.getElementsByClassName("inv-" + newIndex)[0];
    if (newIndex != -1 && !newItem.hasChildNodes()) {
        // Add item in DB
        player.inventory[newIndex] = itemLabel;
        // Create HTML Visual
        // Item index == Inventory place
        createItem(newItem, itemLabel, itemSrc, itemDesc);
    }
    else {
        console.log("Inventory Full");
    }
}

function createItem(newItem, itemLabel, itemSrc, itemDesc) {
    // Create Item IMG
    newItem.appendChild(document.createElement("img"));
    newItem.childNodes[0].classList.add("inv-item");
    newItem.childNodes[0].src = itemSrc;
    // Create Item Decsription (H1 label & P description)
    newItem.appendChild(document.createElement("span"));
    newItem.childNodes[1].classList.add("item-description");
    newItem.childNodes[1].appendChild(document.createElement("h1"));
    newItem.childNodes[1].childNodes[0].textContent = itemLabel;
    newItem.childNodes[1].appendChild(document.createElement("p"));
    newItem.childNodes[1].childNodes[1].textContent = itemDesc;
}