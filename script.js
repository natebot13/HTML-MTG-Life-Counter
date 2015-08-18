function xcrement(player, amount) {
    var myElement = document.getElementById(player).getElementsByClassName("lifeTotal")[0]
    myElement.innerHTML = parseInt(myElement.innerHTML) + amount
    console.log("Changed  " + player + " life by " + amount)
}

function setGradient(player, colorString) {
    //(red,green,blue,white,black)
    colorString = colorString[0] + colorString + colorString[ colorString.length - 1]
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
            gradString += "#dce0bb"
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
