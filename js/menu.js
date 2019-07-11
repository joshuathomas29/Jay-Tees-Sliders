//global variable for game difficulty initialised at Easy, this global variable is only changed when selecting difficulty.
var currentDifficulty = "Easy";
/*
    global variable grid multiplier, initialised at 3 for Easy,
    this global variable is updated when a difficulty selection is made, and checked when exiting a puzzle
*/
var gridMultiplier = 3;

/*
    creates menu for page on load (main menu)
    This is the first page user interacts with and their navigation to the rest of the game.
*/
function mainMenu() {
    var appNameTitle, pictureSelectorButton, numberSelectorButton, diffucultySelectorButton, howToPlayButton, menuWrapper, screenWrapper, playOrStopSoundButton, personalBestButton;
    appNameTitle = createHeading1("Jay Tee's Sliders");
    playOrStopSoundButton = createButton("Music");
    sliderSelectorButton = createButton("Choose Slider");
    diffucultySelectorButton = createButton("Set Difficulty: " + currentDifficulty);
    howToPlayButton = createButton("How To Play");
    playNowButton = createButton("Play Now");
    personalBestButton = createButton("Best Scores");
    gameInstructions = createParagraph("Click on a tile next to the empty space to swap positions. The goal is the move all the tiles to form the selected puzzle! The empty piece always ends up in the bottom right corner.");
    //hide instructions unless user asks for them
    gameInstructions.style.opacity = 0;
    gameInstructions.classList.add("instructions");
    screenWrapper = createDiv(appNameTitle, playNowButton, sliderSelectorButton, diffucultySelectorButton, personalBestButton, howToPlayButton, playOrStopSoundButton, gameInstructions);
    screenWrapper.classList.add("screenDiv");
    document.body.innerHTML = "";
    document.body.appendChild(screenWrapper);
    playNowButton.onclick = function() {
        if (gridMultiplier == 3) gameBoard(randomPuzzle(easyDifficulty));
        else if (gridMultiplier == 4) gameBoard(randomPuzzle(mediumDifficulty));
    }
    howToPlayButton.onclick = function () {
        if (gameInstructions.style.opacity == 1) gameInstructions.style.opacity = 0;
        else gameInstructions.style.opacity = 1;
        }
    //onclick for sound toggle, if sound is playing, it will pause, if paused it will play.
    playOrStopSoundButton.onclick = function () {
        if (backgroundMusic.paused) {
            backgroundMusic.setAttribute("loop", "true");
            backgroundMusic.volume = 0.45;
            backgroundMusic.play();
        }
        else backgroundMusic.pause();
        }
    sliderSelectorButton.onclick = slidersMenu;
    diffucultySelectorButton.onclick = setDifficultyMenu;
    personalBestButton.onclick = personalBestScreen;
}

/*
    creates the slider slection menu, images swap out depending on which category picked, default slider is the number grid.
    All slider images available are loaded, then appended to the sliderTypesDiv, given their category is chosen
*/
function slidersMenu() {
    var pictureTitle = createHeading1("Select Slider");
    var backToMainButton = createButton("Main Menu");
    var backToSlidersButton = createButton("Back to Sliders");
    var lanscapesSlidersButton = createButton("Landscapes");
    lanscapesSlidersButton.classList.add("sliderTypeDivRight");
    var animalSlidersButton = createButton("Animals");
    animalSlidersButton.classList.add("sliderTypeDiv");
    var famousFacesSlidersButton = createButton("Famous Faces");
    famousFacesSlidersButton.classList.add("sliderTypeDivRight");
    //create all the images for sliders and assign a class for styling.
    var mountainFlowerSlider = createImage("images/landscapes/mountainflowerfull.jpg", "mountainFlowers", "sliderTypeDiv");
    var autumnTrailSlider = createImage("images/landscapes/autumnTrail.jpg", "autumnTrail", "sliderTypeDivRight");
    var forestRoadSlider = createImage("images/landscapes/forestRoad.jpg", "forestRoad", "sliderTypeDiv");
    var goldenGateSlider = createImage("images/landscapes/goldenGate.jpg", "goldenGate", "sliderTypeDivRight");
    var greenHillSlider = createImage("images/landscapes/greenHill.jpg", "greenHill", "sliderTypeDiv");
    var japaneseGardenSlider = createImage("images/landscapes/japaneseGarden.jpg", "japaneseGarden", "sliderTypeDivRight");
    var beyonceSlider = createImage("images/faces/beyonce.jpg", "beyonce", "sliderTypeDiv");
    var einsteinSlider = createImage("images/faces/einstein.jpg", "einstein", "sliderTypeDivRight");
    var elvisSlider = createImage("images/faces/elvis.jpg", "elvis", "sliderTypeDiv");
    var marilynArtSlider = createImage("images/faces/marilynArt.jpg", "marilynArt", "sliderTypeDivRight");
    var obamaSlider = createImage("images/faces/obama.jpg", "obama", "sliderTypeDiv");
    var queenSlider = createImage("images/faces/queen.jpg", "queen", "sliderTypeDivRight");
    var catFaceSlider = createImage("images/animals/catFace.jpg", "catFace", "sliderTypeDiv");
    var eagleSlider = createImage("images/animals/eagle.jpg", "eagle", "sliderTypeDivRight");
    var huskyeSlider = createImage("images/animals/husky.jpg", "husky", "sliderTypeDiv");
    var lionFaceSlider = createImage("images/animals/lionFace.jpg", "lionFace", "sliderTypeDivRight");
    var parrotsSlider = createImage("images/animals/parrots.jpg", "parrots", "sliderTypeDiv");
    var sheepSlider = createImage("images/animals/sheep.jpg", "sheep", "sliderTypeDivRight");
    var defaultSlider = createButton("Number Grid");
    var randomSliderButton = createButton("Random Slider!");
    var changeDifficultyButton = createButton("Change Difficulty");
    defaultSlider.classList.add("sliderTypeDiv");
    var sliderTypesDiv = createDiv(defaultSlider, lanscapesSlidersButton, animalSlidersButton, famousFacesSlidersButton);
    var selectSliderWrapper = createDiv(pictureTitle, backToMainButton, sliderTypesDiv, randomSliderButton, changeDifficultyButton);
    selectSliderWrapper.classList.add("selectSliderWrapper");
    var screenWrapper = createDiv(selectSliderWrapper);
    screenWrapper.classList.add("screenDiv");
    document.body.innerHTML = "";
    document.body.append(screenWrapper);
    backToSlidersButton.onclick = slidersMenu;
    randomSliderButton.onclick = function() {
        if (gridMultiplier == 3) gameBoard(randomPuzzle(easyDifficulty));
        else if (gridMultiplier == 4) gameBoard(randomPuzzle(mediumDifficulty));
    }
    changeDifficultyButton.onclick = setDifficultyMenu;
    //remove options and display selection
    lanscapesSlidersButton.onclick = function () {
        sliderTypesDiv.innerHTML = "";
        selectSliderWrapper.removeChild(randomSliderButton);
        selectSliderWrapper.removeChild(changeDifficultyButton);
        //append all relavent images
        selectSliderWrapper.insertBefore(backToSlidersButton, sliderTypesDiv);
        sliderTypesDiv.appendChild(mountainFlowerSlider);
        sliderTypesDiv.appendChild(autumnTrailSlider);
        sliderTypesDiv.appendChild(forestRoadSlider);
        sliderTypesDiv.appendChild(goldenGateSlider);
        sliderTypesDiv.appendChild(greenHillSlider);
        sliderTypesDiv.appendChild(japaneseGardenSlider);
    }
    animalSlidersButton.onclick = function () {
        sliderTypesDiv.innerHTML = "";
        selectSliderWrapper.removeChild(randomSliderButton);
        selectSliderWrapper.removeChild(changeDifficultyButton)
        selectSliderWrapper.insertBefore(backToSlidersButton, sliderTypesDiv);
        sliderTypesDiv.appendChild(catFaceSlider);
        sliderTypesDiv.appendChild(eagleSlider);
        sliderTypesDiv.appendChild(huskyeSlider);
        sliderTypesDiv.appendChild(lionFaceSlider);
        sliderTypesDiv.appendChild(parrotsSlider);
        sliderTypesDiv.appendChild(sheepSlider);
    }
    famousFacesSlidersButton.onclick = function () {
        sliderTypesDiv.innerHTML = "";
        selectSliderWrapper.removeChild(randomSliderButton);
        selectSliderWrapper.removeChild(changeDifficultyButton)
        selectSliderWrapper.insertBefore(backToSlidersButton, sliderTypesDiv);
        sliderTypesDiv.appendChild(beyonceSlider);
        sliderTypesDiv.appendChild(einsteinSlider);
        sliderTypesDiv.appendChild(elvisSlider);
        sliderTypesDiv.appendChild(marilynArtSlider);
        sliderTypesDiv.appendChild(obamaSlider);
        sliderTypesDiv.appendChild(queenSlider);
    }
    //add onclicks to all images
    defaultSlider.onclick = function () {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyNumber);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumNumber);
        }
    }
    mountainFlowerSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyMountainFlower);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumMountainFlower);
        }
    }
    autumnTrailSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyAutumnTrail);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumAutumnTrail);
        }
    }
    forestRoadSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyForestRoad);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumForestRoad);
        }
    }
    goldenGateSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyGoldenGate);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumGoldenGate);
        }
    }
    greenHillSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyGreenHill);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumGreenHill);
        }
    }
    japaneseGardenSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyJapaneseGarden);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumJapaneseGarden);
        }
    }
    beyonceSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyBeyonce);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumBeyonce);
        }
    }
    einsteinSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyEinstein);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumEinstein);
        }
    }
    elvisSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyElvis);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumElvis);
        }
    }
    marilynArtSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyMarilynArt);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumMarilynArt);
        }
    }
    obamaSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyObama);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumObama);
        }
    }
    queenSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyQueen);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumQueen);
        }
    }
    catFaceSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyCatFace);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumCatFace);
        }
    }
    eagleSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyEagle);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumEagle);
        }
    }
    lionFaceSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyLionFace);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumLionFace);
        }
    }
    huskyeSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyHusky);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumHusky);
        }
    }
    parrotsSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easyParrots);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumParrots);
        }
    }
    sheepSlider.onclick = function() {
        if (currentDifficulty == "Easy") {
            gameBoard(easyDifficulty.easySheep);
        } else if (currentDifficulty == "Medium") {
            gameBoard(mediumDifficulty.mediumSheep);
        }
    }
    backToMainButton.onclick = mainMenu;
}

/*
    menu to select difficulty, easy for 3x3 grids, medium for 4x4s, and hard for a special game type
    difficulty selected will change the gridMultiplier global variable
*/
function setDifficultyMenu() {
    var difficultyTitle, easyButton, mediumButton, hardButton, screenWrapper;
    difficultyTitle = createHeading2("Select Difficulty");
    easyButton = createButton("Easy: 3x3");
    mediumButton = createButton("Medium: 4x4");
    hardButton = createButton("Hard");
    screenWrapper = createDiv(difficultyTitle, easyButton, mediumButton, hardButton);
    document.body.innerHTML = "";
    document.body.appendChild(screenWrapper);
    screenWrapper.classList.add("screenDiv");
    easyButton.onclick = function() {
        currentDifficulty = "Easy";
        gridMultiplier = 3;
        mainMenu();
    }
    mediumButton.onclick = function() {
        currentDifficulty = "Medium";
        gridMultiplier = 4;
        mainMenu();
    }
    hardButton.onclick = function() {
        gridMultiplier = 5;
        hardMenu();
    }
}

/*
    Displays menu for hard mode
    gives user instructions of how to play, and options to play the slider or return to main menu.
*/
function hardMenu() {
    var hardTitle, backToMainButton, hardInstructions, screenWrapper, playHardButton;
    hardTitle = createHeading2("This will be a challenge!");
    hardInstructions = createParagraph("You must slide the tiles in an order so that each column and row add up to the number displayed around the slider. There will be no indicators of correct placement, and the board will shuffle instantly. Take your time, problem solve.");
    playHardButton = createButton("Play Hard Mode");
    backToMainButton = createButton("Main Menu");
    document.body.innerHTML = "";
    screenWrapper = createDiv(hardTitle, hardInstructions, playHardButton, backToMainButton);
    screenWrapper.classList.add("screenDiv");
    document.body.appendChild(screenWrapper);
    playHardButton.onclick = function() {
        gameBoard(hardDifficulty)
    }
    backToMainButton.onclick = mainMenu;
}

/*
    displays win screen on completion, shows user time taken and amount of moves made
    gives user option to replay the same puzzle, load a random puzzle, go to sliders menu, or main menu.
    parameter   time - the time it took user to complete puzzle
    parameter   moves - the amount of moves user took to complete puzzle
    parameter   slider - the slider that was played
*/
function winScreen(time, moves, slider) {
    var screenWrapper, backToMainButton, winMessage, totalMoves, totalTime, playRandomPuzzleButton, replaySliderButton, backToSlidersMenuButton;
    document.body.innerHTML = "";
    backToMainButton = createButton("Main Menu");
    winMessage = createHeading1("You Won!");
    totalMoves = createHeading2(moves);
    totalTime = createHeading2(time);
    playRandomPuzzleButton = createButton("Play Random Slider");
    replaySliderButton = createButton("Replay Same Slider");
    backToSlidersMenuButton = createButton("Sliders List");
    screenWrapper = createDiv(winMessage, totalMoves, totalTime, backToMainButton, replaySliderButton, backToSlidersMenuButton, playRandomPuzzleButton);
    screenWrapper.classList.add("screenDiv");
    document.body.appendChild(screenWrapper);
    backToMainButton.onclick = mainMenu;
    playRandomPuzzleButton.onclick = function() {
        if (gridMultiplier == 3) gameBoard(randomPuzzle(easyDifficulty));
        else if (gridMultiplier == 4) gameBoard(randomPuzzle(mediumDifficulty));
    }
    replaySliderButton.onclick = function() {
        gameBoard(slider);
    }
    backToSlidersMenuButton.onclick = slidersMenu;
}

/*
    Displays users best scores for each difficulty, data is called from the playerStats structure.
*/
function personalBestScreen() {
    var screenWrapper, personalBestTitle, backToMainButton, easyHeading, medHeading, hardHeading, bestEasyDiv, bestEasyTime, bestEasyMoves, bestMedDiv, bestMedTime, bestMedMoves, bestHardDiv, bestHardTime, bestHardMoves;
    backToMainButton = createButton("Main Menu");
    personalBestTitle = createHeading1("Your Best Attempts!");
    easyHeading = createHeading2("Easy Puzzles");
    bestEasyTime = createParagraph(playerStats.easyPuzzleBest.bestTimeDisplay);
    bestEasyMoves = createParagraph(playerStats.easyPuzzleBest.bestMovesDisplay);
    bestEasyDiv = createDiv(easyHeading, bestEasyTime, bestEasyMoves);
    medHeading = createHeading2("Medium Puzzles");
    bestMedTime = createParagraph(playerStats.mediumPuzzleBest.bestTimeDisplay);
    bestMedMoves = createParagraph(playerStats.mediumPuzzleBest.bestMovesDisplay);
    bestMedDiv = createDiv(medHeading, bestMedTime, bestMedMoves);
    hardHeading = createHeading2("Hard Mode");
    bestHardTime = createParagraph(playerStats.hardPuzzleBest.bestTimeDisplay);
    bestHardMoves = createParagraph(playerStats.hardPuzzleBest.bestMovesDisplay);
    bestHardDiv = createDiv(hardHeading, bestHardTime, bestHardMoves);
    screenWrapper = createDiv(personalBestTitle, bestEasyDiv, bestMedDiv, bestHardDiv, backToMainButton);
    screenWrapper.classList.add("screenDiv", "bestScreen");
    document.body.innerHTML = "";
    document.body.appendChild(screenWrapper);
    backToMainButton.onclick = mainMenu;
}
