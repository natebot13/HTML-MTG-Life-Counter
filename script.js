function xcrement(player, amount) {
    var myElement = document.getElementById(player).getElementById("lifeTotal")
    myElement.innerHTML = myElement.innerHTML.value + amount.value
    console.log("Changed  " + player + " life by " + amount.value)
}

function setGradient(player, colorString) {
    //(red,green,blue,white,black)
    var gradString = ""
    for (var i = 0; i < colorString.length; i++) {
        if (colorString[i].toLowerCase() === "r") {
            gradString += "red"
        } else
        if (colorString[i].toLowerCase() === "g") {
            gradString += "green"
        } else
        if (colorString[i].toLowerCase() === "u") {
            gradString += "blue"
        } else
        if (colorString[i].toLowerCase() === "w") {
            gradString += "white"
        } else
        if (colorString[i].toLowerCase() === "b") {
            gradString += "black"
        }
        if (i != colorString.length - 1) {
            gradString += ","
        }
    }
    console.log("Set " + player + " background to " + gradString)
    if (colorString.length > 1) {
        gradString = "linear-gradient(to bottom," + gradString + ")"
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
