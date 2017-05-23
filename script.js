var numPlayers = 1;

function basePlayer(name) {
    this.name = name;
    this.life = 20;
    this.colors = "WUBRG".split("");
    this.renderElement = NaN;
    this.flipped = false;
    this.flip = function() {
        this.flipped = !this.flipped;
    };
    this.clearColors = function() {
        this.colors = [];
    };
    this.refresh = function() {
        this.render(this.renderElement);
    };
    this.getColors = function() {
        return this.colors;
    };
    this.getColorString = function() {
        return this.colors.join(",");
    };
    this.getLife = function() {
        return this.life;
    };
    this.getName = function() {
        return this.playerName;
    };
    this.xcrementLife = function(n) {
        // console.log("Attempt to add " + n + " life to " + this.name);
        this.life = this.life + n;
        // console.log(this.name + ".life=" + this.life);
    };
    this.setColors = function(colorString) {
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
    };
    this.getColorsStyle = function() {
        if (this.colors.length > 1) {
            this.colors = "linear-gradient(135deg," + this.colors + ")";
        }
        return gradString;
    };
    this.render = function(element) {
        // memorize which element to render to/refresh
        this.renderElement = element;
        // delete all child nodes (useful for case of refresh)
        for (var i = element.children.length - 1; i >= 0; i--) {
            element.removeChild(element.children[i]);
        }
        // evaluate a reference to self
        var that = this;
        // the whole player thing
        var mydiv = document.createElement("div");
        element.appendChild(mydiv);
        mydiv.classList.add("player");
        if (this.colors.length > 0) {
            colorString = this.colors.join("");
        } else {
            colorString = "WUBRG";
        }
        styleString = gradStyleString(colorString);
        // console.log(this.name + " background = " + styleString);
        mydiv.style.background = styleString;
        if (this.flipped) {
            mydiv.style.transform = "rotate(180deg)";
        } else {
            mydiv.style.transform = "";
        }

        // I don't remember what texture is for
        var textureDiv = document.createElement("div");
        mydiv.appendChild(textureDiv);
        textureDiv.classList.add("texture");

        // another containing element
        var boxDiv = document.createElement("div");
        textureDiv.appendChild(boxDiv);
        boxDiv.classList.add("box");

        // player name input
        var nameInput = document.createElement("input");
        boxDiv.appendChild(nameInput);
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
        boxDiv.appendChild(plusDiv);
        plusDiv.classList.add("xcrement");

        var adds = [5, 1];
        var btn = NaN;
        for (var i = adds.length - 1; i >= 0; i--) {
            var btn = document.createElement("button");
            plusDiv.appendChild(btn);
            btn.innerHTML = adds[i];
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
        boxDiv.appendChild(lifeDisplay);
        lifeDisplay.classList.add("lifeTotal");
        lifeDisplay.innerHTML = this.life;

        // life subtract buttons
        var minusDiv = document.createElement("div");
        boxDiv.appendChild(minusDiv);
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
        boxDiv.appendChild(colorList);
        colorList.classList.add("colorsList");
        colorList.disabled = true;
        colorList.value = this.colors.join("");

        // color setting buttons
        var letters = "WUBRG".split("").reverse();
        for (var i = letters.length - 1; i >= 0; i--) {
            var btn = document.createElement("button");
            boxDiv.appendChild(btn);
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
        boxDiv.appendChild(clearColorsBtn);
        clearColorsBtn.classList.add("clearBtn");
        clearColorsBtn.innerHTML = "CLR";
        clearColorsBtn.addEventListener("click", function() {
            that.clearColors();
        });

        // flip button
        var flipButton = document.createElement("button");
        boxDiv.appendChild(flipButton);
        flipButton.classList.add("flipBtn");
        flipButton.innerHTML = "Flip";
        flipButton.addEventListener("click", function() {
            that.flip();
            that.refresh();
        });
    };
}

function playerManager() {
    this.players = [];
    this.count = 0;
    this.renderElement = NaN;
    this.addPlayer = function() {
        this.players.push(new basePlayer("Planeswalker" + this.count));
        this.render(this.renderElement);
        // once rendered, clear the colors so that the expected color change happens on first click
        this.players[this.count].clearColors();
        this.count++;
    };
    this.render = function(element) {
        this.renderElement = element;
        // loop through target containing element and delete all children
        for (var i = element.children.length - 1; i >= 0; i--) {
            element.removeChild(element.children[i]);
        }
        // instantiate an HTML table
        var table = document.createElement("TABLE");
        // add it as a child of the rendering target
        element.appendChild(table);
        var row = table.insertRow();
        for (var i = 0; i < this.players.length; i++) {
            // loop through list of players, for each one creating HTML table column
            // and render those players each into their own column
            console.log("rendering player " + i);
            var col = row.insertCell();
            this.players[i].render(col);
        }
    };
    this.refresh = function() {
        this.render(this.renderElement);
    };
    this.reset = function() {
        this.count = 0;
        var l = this.players.length;
        this.players.splice(0, l);
    };
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
if (isStorageAvailable) {
} else {
    var manager = new playerManager();
}
manager.render(document.getElementById("allPlayers"));
// add the first and second players
for (var i = 0; i < 2; i++) {
    manager.addPlayer();
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
            grads.push("#232323");
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
