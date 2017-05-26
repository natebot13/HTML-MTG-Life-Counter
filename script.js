"use strict";

var numPlayers = 1;

class BasePlayer {
    constructor(name) {
        this.name = name;
        this.life = 20;
        this.colors = "WUBRG".split("");
        this.renderElement = NaN;
        this.flipped = false;
        this.colorString = "";
    }
    static unJSON(json_obj) {
        var p = new BasePlayer();
        // debug the deserialized player attributes
        // console.log("loading JSON into self:");
        // console.log("player data: " + json_obj);
        for (var v in json_obj) {
            // debug individual attribute values
            // console.log("Setting this.[" + v + "] to " + json_obj[v]);
            p[v] = json_obj[v];
        }
        return p;
    }
    flip() {
        this.flipped = !this.flipped;
    }
    clearColors() {
        this.colors = [];
    }
    refresh() {
        this.render(this.renderElement);
    }
    getColors() {
        return this.colors;
    }
    getColorString() {
        return this.colors.join(",");
    }
    getLife() {
        return this.life;
    }
    getName() {
        return this.playerName;
    }
    xcrementLife(n) {
        // console.log("Attempt to add " + n + " life to " + this.name);
        this.life = this.life + n;
        // console.log(this.name + ".life=" + this.life);
    }
    setColors(colorString) {
        colorString =
            colorString[0] + colorString + colorString[colorString.length - 1];
        var gradString = "";
        for (var i = 0; i < colorString.length; i++) {
            var c = colorString[i].toLowerCase();
            if (c === "r") {
                // gradString += "red"
                gradString += "#E13C1E";
            } else if (c === "g") {
                // gradString += "green"
                gradString += "#336600";
            } else if (c === "u") {
                // gradString += "blue"
                gradString += "#0066cc";
            } else if (c === "w") {
                // gradString += "white"
                gradString += "#dce0bb";
            } else if (c === "b") {
                // gradString += "black"
                gradString += "#232323";
            }
            if (i != colorString.length - 1) {
                gradString += ",";
            }
        }
        // console.log("Set " + this.playerName + " background to " + gradString)
        this.colors.push(colorString);
    }
    getColorsStyle() {
        if (this.colors.length > 1) {
            this.colors = "linear-gradient(135deg," + this.colors + ")";
        }
        return gradString;
    }
    render(containingElement) {
        // memorize which containingElement to render to/refresh
        this.renderElement = containingElement;
        // delete all child nodes (useful for case of refresh)
        for (var i = containingElement.children.length - 1; i >= 0; i--) {
            containingElement.removeChild(containingElement.children[i]);
        }
        // evaluate a reference to self
        var that = this;

        // the whole player thing
        var playerCard = document.createElement("div");
        containingElement.appendChild(playerCard);
        playerCard.classList.add("player");
        var colorString = "";
        if (this.colors.length > 0) {
            colorString = this.colors.join("");
        } else {
            colorString = "WUBRG";
        }
        var styleString = gradStyleString(colorString);
        playerCard.style.background = styleString;

        // I don't remember what texture is for
        var textureDiv = document.createElement("div");
        playerCard.appendChild(textureDiv);
        textureDiv.classList.add("texture");

        // another containing containingElement
        var boxDiv = document.createElement("div");
        textureDiv.appendChild(boxDiv);
        boxDiv.classList.add("box");

        // finally, the meat of it.
        // the card should have a top half for life
        // and a bottom half for color
        // only the top should flip

        var topHalf = document.createElement("div");
        textureDiv.appendChild(topHalf);
        topHalf.classList.add("topHalf");
        boxDiv.appendChild(topHalf);

        // decide whether to render flipped
        if (this.flipped) {
            topHalf.style.transform = "rotate(180deg)";
        } else {
            topHalf.style.transform = "";
        }


        var bottomHalf = document.createElement("div");
        textureDiv.appendChild(bottomHalf);
        bottomHalf.classList.add("topHalf");
        boxDiv.appendChild(bottomHalf);

        // player name input
        var nameInput = document.createElement("input");
        topHalf.appendChild(nameInput);
        nameInput.classList.add("playerName");
        nameInput.placeholder = name;
        nameInput.value = this.name;

        // allow changing name
        nameInput.addEventListener("keyup", function() {
            // console.log("set " + that.name + " to " + nameInput.value);
            that.name = nameInput.value;
        });

        // life adding buttons
        var plusDiv = document.createElement("div");
        topHalf.appendChild(plusDiv);
        plusDiv.classList.add("xcrement");

        var adds = [5, 1];
        var btn = NaN;
        for (var i = adds.length - 1; i >= 0; i--) {
            var btn = document.createElement("button");
            plusDiv.appendChild(btn);
            btn.innerHTML = "+" + adds[i];
            var n = adds[i];
            // nested function definitions to force evaluation of required variables
            // AKA lots of closure nonsense
            btn.addEventListener(
                "click",
                (function(N) {
                    return function() {
                        that.xcrementLife(N);
                        that.refresh();
                    };
                })(n)
            );
        }

        // life display span
        var lifeDisplay = document.createElement("span");
        topHalf.appendChild(lifeDisplay);
        lifeDisplay.classList.add("lifeTotal");
        lifeDisplay.innerHTML = this.life;

        // life subtract buttons
        var minusDiv = document.createElement("div");
        topHalf.appendChild(minusDiv);
        minusDiv.classList.add("xcrement");

        var subs = [-5, -1];
        var btn = NaN;
        for (var i = subs.length - 1; i >= 0; i--) {
            var btn = document.createElement("button");
            minusDiv.appendChild(btn);
            btn.innerHTML = subs[i];
            var n = subs[i];
            btn.addEventListener(
                "click",
                (function(N) {
                    return function() {
                        that.xcrementLife(N);
                        that.refresh();
                    };
                })(n)
            );
        }

        // MTG color list
        var colorList = document.createElement("input");
        bottomHalf.appendChild(colorList);
        colorList.classList.add("colorsList");
        colorList.disabled = true;
        colorList.value = this.colors.join("");

        // color setting buttons
        var letters = "WUBRG".split("").reverse();
        for (var i = letters.length - 1; i >= 0; i--) {
            var btn = document.createElement("button");
            bottomHalf.appendChild(btn);
            btn.classList.add("manaBtn");
            btn.classList.add(letters[i]);
            btn.addEventListener(
                "click",
                (function(c) {
                    return function() {
                        that.colors.push(c);
                        // console.log(that.name + " add color " + c + " => " + that.colors);
                        that.refresh();
                    };
                })(letters[i])
            );
        }

        // clear colors
        var clearColorsBtn = document.createElement("button");
        bottomHalf.appendChild(clearColorsBtn);
        clearColorsBtn.classList.add("clearBtn");
        clearColorsBtn.innerHTML = "CLR";
        clearColorsBtn.addEventListener("click", function() {
            that.clearColors();
        });

        // flip button
        var flipButton = document.createElement("button");
        bottomHalf.appendChild(flipButton);
        flipButton.classList.add("flipBtn");
        flipButton.innerHTML = "Flip";
        flipButton.addEventListener("click", function() {
            that.flip();
            that.refresh();
        });
    }
}

class playerManager {
    constructor() {
        this.players = [];
        this.count = 0;
        this.renderElement = NaN;
    }
    static unJSON(json_obj) {
        var plist = json_obj["players"];
        var pm = new playerManager();
        // display what data was deserialized
        // console.log(Object.keys(json_obj));
        for (var v in plist) {
            var p = BasePlayer.unJSON(plist[v]);
            pm.loadExistingPlayer(p);
        }
        return pm;
    }
    loadExistingPlayer(p) {
        this.players.push(p);
        this.count++;
    }
    addPlayer() {
        this.players.push(new BasePlayer(""));
        // once rendered, clear the colors so that the expected color change happens on first click
        this.players[this.count].clearColors();
        this.count++;
    }
    render(containingElement) {
        this.renderElement = containingElement;
        // loop through target containing containingElement and delete all children
        for (var i = containingElement.children.length - 1; i >= 0; i--) {
            containingElement.removeChild(containingElement.children[i]);
        }
        // instantiate an HTML table
        var table = document.createElement("TABLE");
        // add it as a child of the rendering target
        containingElement.appendChild(table);
        var row = table.insertRow();
        for (var i = 0; i < this.players.length; i++) {
            // loop through list of players, for each one creating HTML table column
            // and render those players each into their own column
            // console.log("rendering player " + i);
            var col = row.insertCell();
            this.players[i].render(col);
        }
    }
    refresh() {
        this.render(this.renderElement);
    }
    reset() {
        this.count = 0;
        var l = this.players.length;
        this.players.splice(0, l);
    }
}
// ========== Storage ==========
var isStorageAvailable = false;
//determine if local storage is available
if (typeof Storage !== "undefined") {
    // Code for localStorage/sessionStorage.
    isStorageAvailable = true;
} else {
    // Sorry! No Web Storage support..
    alert("storage not available! :(");
}

// ========== Globals ==========
var manager = new playerManager();
if (isStorageAvailable) {
    var item = JSON.parse(localStorage.getItem("savedManager"));
    // console.log(item);
    if (item != null) {
        try {
            manager = playerManager.unJSON(item);
        } catch (e) {
            manager = new playerManager();
            console.log(e);
            alert(e);
        }
    }
}
// debug manager attributes
// console.log(manager);
manager.render(document.getElementById("allPlayers"));
// add the first and second players
if (manager.players.length < 2) {
    for (var i = 0; i < 2; i++) {
        manager.addPlayer();
    }
}
// display it
manager.refresh();

// MTG color to styling helper functions
function gradientString(colors) {
    var grads = [];
    for (var i = 0; i < colors.length; i++) {
        var c = colors[i].toLowerCase();
        if (c === "r") {
            // gradString += "red"
            grads.push("#E13C1E");
        } else if (c === "g") {
            // grads.push("green");
            grads.push("#336600");
        } else if (c === "u") {
            // grads.push("blue");
            grads.push("#0066cc");
        } else if (c === "w") {
            // grads.push("white");
            grads.push("#dce0bb");
        } else if (c === "b") {
            // grads.push("black");
            grads.push("#444444");
        }
    }
    // console.log("grads " + grads);
    return grads.join(",");
}

function gradStyleString(colorString) {
    if (colorString.length > 0) {
        // the ends of the diagonal gradient are tiny, so double them up

        colorString =
            colorString[0] + colorString + colorString[colorString.length - 1];

        return (
            "linear-gradient(135deg," +
            gradientString(colorString.split("")) +
            ")"
        );
    } else {
        return "linear-gradient(135deg,#111111)";
    }
}

var addPlayer = function() {
    manager.addPlayer();
    manager.refresh();
    console.log("all players: " + manager.players);
    console.log("Added player " + String(numPlayers));
    manager.render(document.getElementById("allPlayers"));
};

function replaceAll(source, search, replace) {
    return source.split(search).join(replace);
}

function playCommander() {
    for (var i = manager.players.length - 1; i >= 0; i--) {
        manager.players[i].life = 40;
    }
    manager.refresh();
}

function playSixty() {
    for (var i = manager.players.length - 1; i >= 0; i--) {
        manager.players[i].life = 20;
    }
    manager.refresh();
}

function reset() {
    manager.reset();
    for (var i = 0; i < 2; i++) {
        manager.addPlayer();
        manager.refresh();
    }
}

setInterval(function() {
    var serialized = JSON.stringify(manager);
    // console.log("saving: " + serialized);
    localStorage.setItem("savedManager", serialized);
}, 5000);
