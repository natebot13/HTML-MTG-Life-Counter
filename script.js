var numPlayers = 1

function xcrement(player, amount) {
    var myElement = document.getElementById(player).getElementsByClassName("lifeTotal")[0]
    myElement.innerHTML = parseInt(myElement.innerHTML) + amount
    console.log("Changed  " + player + " life by " + amount)
}

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

}

function addColor(player, letter) {
    var myElement = document.getElementById(player).getElementsByClassName("colorsList")[0];
    myElement.value += letter;
    setGradient(player, myElement.value)
}

function resetColors(player) {
    document.getElementById(player).getElementById("colorsList").innerHTML = ""
}

function clearColors(player) {
    var myElement = document.getElementById(player).getElementsByClassName("colorsList")[0];
    myElement.value = "";
}

function addPlayer() {
    var template = String(document.getElementById("P1").innerHTML)
    numPlayers++
    var output = '<div class="player" id="P1">'.replace("P1", "P" + String(numPlayers)) + replaceAll(template, "P1", "P" + String(numPlayers)) + "</div>"
    document.getElementById("allPlayers").innerHTML += "<td>" + output + "</td>"
    console.log("Added player " + String(numPlayers))
}

function flipPlayer(player) {
    if (document.getElementById(player).style.transform === "") {
        document.getElementById(player).style.transform = "rotate(180deg)"
    } else {
        document.getElementById(player).style.transform = ""
    }
}

function replaceAll(source, search, replace) {
    return source.split(search).join(replace)
}
