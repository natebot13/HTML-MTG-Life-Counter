function xcrement(player, amount) {
    document.getElementById(player).getElementById("lifeTotal") += amount
}

function setGradient(player, colorString) {
    //(red,green,blue,white,black)
    var gradStr = ""
    for (var i = 0; i < colorString.length; i++) {
        if (colorString[i].toLowerCase == "r") {
            gradString += "red"
        } else
        if (colorString[i].toLowerCase == "g") {
            gradString += "green"
        } else
        if (colorString[i].toLowerCase == "u") {
            gradString += "blue"
        } else
        if (colorString[i].toLowerCase == "w") {
            gradString += "white"
        } else
        if (colorString[i].toLowerCase == "b") {
            gradString += "black"
        }
        if (i != colorString.length) {
            gradString += ","
        }
    }
    console.log("Set " + player + " background to " + gradString)
    document.getElementById(player).style.background = "linear-gradient(" + gradString + ");"

}

function addColor(player, letter) {

}

function resetColors(player) {

}
