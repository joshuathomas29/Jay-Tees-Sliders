//Global variable for background music, controlled through the main menu, and other various screen to toggle on and off.
var backgroundMusic = new Audio("sounds/backgroundmusic.wav");

//only needs to call the main menu, everything else is run from user input
function loadApplication() {
    mainMenu();
}


window.onload = loadApplication;
