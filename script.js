var numPlayers = 1;

function basePlayer(name) {
    this.name = name;
    this.life = 20;
    this.colors = [];
    this.getColors = function() {
        return this.colors
    };
    this.getColorString = function() {
        return this.colors.join(",");
    };
    this.getLife = function() {
        return this.life
    };
    this.getName = function() {
        return this.playerName
    };
    this.xcrementLife = function(n) {
        this.life = Number(this.life) + n
    };
    this.setColors = function(colorString) {
        colorString = colorString[0] + colorString + colorString[colorString.length - 1]
        var gradString = ""
        for (var i = 0; i < colorString.length; i++) {
            var c = colorString[i].toLowerCase();
            if (c === "r") {
                // gradString += "red"
                gradString += "#E13C1E"
            } else
            if (c === "g") {
                // gradString += "green"
                gradString += "#336600"
            } else
            if (c === "u") {
                // gradString += "blue"
                gradString += "#0066cc"
            } else
            if (c === "w") {
                // gradString += "white"
                gradString += "#dce0bb"
            } else
            if (c === "b") {
                // gradString += "black"
                gradString += "#232323"
            }
            if (i != colorString.length - 1) {
                gradString += ","
            }
        }
        console.log("Set " + this.playerName + " background to " + gradString)
        this.colors.push(colorString)
    };
    this.getColorsStyle = function() {
        if (this.colors.length > 1) {
            this.colors = "linear-gradient(135deg," + this.colors + ")"
        }
        return gradString
    };
    this.render = function(element) {
        element.innerHTML = "I am player " + this.name;
        console.log("rendering player " + this.name);
    };

};


function playerManager() {
    this.players = [];
    this.count = 0;
    this.addPlayer = function() {
        this.players.push( new basePlayer(this.count)
);
        this.count++;
    };
    this.render = function(element) {
        // loop through target containing element and delete all children
        for (var i = element.children.length - 1; i >= 0; i--) {
            element.removeChild(element.children[i]);
        }
        // instantiate an HTML table
        var table = document.createElement("TABLE");
        // add it as a child of the rendering target
        element.appendChild(table);
        var row = table.insertRow();
        for (var i = this.players.length - 1; i >= 0; i--) {
            var col = row.insertCell();
            this.players[i].render(col);
        }

        // loop through list of players, for each one creating HTML table column
        // and render those players each into their own column
    }

}


// ========== Globals ==========
var manager = new playerManager();

// ========== UI functions ==========

function xcrement(player, amount) {
    var myElement = document.getElementById(player).getElementsByClassName("lifeTotal")[0]
    myElement.innerHTML = parseInt(myElement.innerHTML) + amount
    console.log("Changed  " + player + " life by " + amount)
};

function setGradient(player, colorString) {
    //(red,green,blue,white,black)
    colorString = colorString[0] + colorString + colorString[colorString.length - 1]
    var gradString = ""
    for (var i = 0; i < colorString.length; i++) {
        if (colorString[i].toLowerCase() === "r") {
            // gradString += "red"
            gradString += "#E13C1E"
        } else
        if (colorString[i].toLowerCase() === "g") {
            // gradString += "green"
            gradString += "#336600"
        } else
        if (colorString[i].toLowerCase() === "u") {
            // gradString += "blue"
            gradString += "#0066cc"
        } else
        if (colorString[i].toLowerCase() === "w") {
            // gradString += "white"
            gradString += "#dce0bb"
        } else
        if (colorString[i].toLowerCase() === "b") {
            // gradString += "black"
            gradString += "#232323"
        }
        if (i != colorString.length - 1) {
            gradString += ","
        }
    }
    console.log("Set " + player + " background to " + gradString)
    if (colorString.length > 1) {
        gradString = "linear-gradient(135deg," + gradString + ")"
    }
    document.getElementById(player).style.background = gradString
        // document.getElementById(player).style.background = "linear-gradient(to bottom, black, blue);"

};

function addColor(player, letter) {
    var myElement = document.getElementById(player).getElementsByClassName("colorsList")[0];
    myElement.value += letter;
    setGradient(player, myElement.value)
};

function resetColors(player) {
    document.getElementById(player).getElementById("colorsList").innerHTML = ""
};

function clearColors(player) {
    var myElement = document.getElementById(player).getElementsByClassName("colorsList")[0];
    myElement.value = "";
};

var addPlayer = function() {
    var template = String(document.getElementById("P1").innerHTML)
    numPlayers++
    var output = '<div class="player" id="P1">'.replace("P1", "P" + String(numPlayers)) + replaceAll(template, "P1", "P" + String(numPlayers)) + "</div>"
    document.getElementById("allPlayers").innerHTML += "<td>" + output + "</td>"
    manager.addPlayer();
    console.log("all players: " + manager.players)
    console.log("Added player " + String(numPlayers))
    manager.render(document.getElementById("test"));
};

function flipPlayer(player) {
    if (document.getElementById(player).style.transform === "") {
        document.getElementById(player).style.transform = "rotate(180deg)"
    } else {
        document.getElementById(player).style.transform = ""
    }
};

function replaceAll(source, search, replace) {
    return source.split(search).join(replace)
};
