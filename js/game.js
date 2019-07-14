//glpbal variable for moves, used to track how many moves player has made, called by winScreen and updated with valid moves
var moves = 0;
var movesTakenDisplayElement = createDiv("Moves: " + moves);
//global variables for timer, used to display how long current game has taken, and displayes time on completion on winScreen
var runningTime;
var totalSecondsPast = 0;
var timerDisplayElement = createDiv("Time - 00:00");

//Basic timer function, called when gameBoard is called and repeats every 1 second
function countTimer() {
    ++totalSecondsPast;
    var minute = Math.floor(totalSecondsPast/60);
    var seconds = totalSecondsPast - (minute*60);
    /*
        conditional operator to display the time: if minutes or seconds is less than 10, a "0" will be
        added as placeholder, otherwise, just show the minutes or seconds..
    */
    timerDisplayElement.innerHTML = "Time - " + (minute < 10 ? "0" + minute : minute) + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

//used to reset the timer when player finishes the game, and when board is shuffled
function resetTimer() {
    totalSecondsPast = 0;
    moves = 0;
    movesTakenDisplayElement.innerHTML = "Moves: " + moves;
    timerDisplayElement.innerHTML = "Time - 00:00";
    clearInterval(runningTime);
}

/*
    Called from the slidersMenu screen when user makes a selection
    Goes through the data list given and pushs into new array to be used when creating the board
*/
function gameBoard(puzzle) {
    document.body.innerHTML = "";
    var puzzleCreate = [];
    //add passed in puzzle into array, will fill until no keys left in data
    for (let pieces in puzzle) {
        puzzleCreate.push(puzzle[pieces]);
    }
    //reset moves and time to 0 anytime a new puzzle is created - time stayed on screen momentarily as theres a delay when calling shuffle.
    resetTimer(runningTime);
    //switch display of best time and moves based on difficulty
    var playerBestTimeDisplay, playerBestMovesDisplay;
    if (gridMultiplier == 3) {
        playerBestMovesDisplay = createDiv(playerStats.easyPuzzleBest.bestMovesDisplay);
        playerBestTimeDisplay = createDiv(playerStats.easyPuzzleBest.bestTimeDisplay);
    } else if (gridMultiplier == 4) {
        playerBestMovesDisplay = createDiv(playerStats.mediumPuzzleBest.bestMovesDisplay);
        playerBestTimeDisplay = createDiv(playerStats.mediumPuzzleBest.bestTimeDisplay);
    } else if (gridMultiplier == 5) {
        playerBestMovesDisplay = createDiv(playerStats.hardPuzzleBest.bestMovesDisplay);
        playerBestTimeDisplay = createDiv(playerStats.hardPuzzleBest.bestTimeDisplay);
    }
    var timeAndMovesWrapper = createDiv(playerBestTimeDisplay, timerDisplayElement, playerBestMovesDisplay, movesTakenDisplayElement);
    timeAndMovesWrapper.classList.add("statsDisplay");
    var backButton = createButton("Select Another Puzzle");
    var toggleMusicButton = createButton("Toggle Music");
    backButton.classList.add("ingameButton");
    toggleMusicButton.classList.add("ingameButton");
    var numberGrid = createDiv();
    numberGrid.classList.add("grid");
    var screenContainer = createDiv(timeAndMovesWrapper, numberGrid, backButton, toggleMusicButton);
    screenContainer.classList.add("screenDiv");
    document.body.appendChild(screenContainer);
    fillBoard(puzzleCreate, numberGrid, gridMultiplier);
    //setup a shuffle loop with visualization, will shuffle 3 times with an interval of 0.4 seconds. -- no delay in hard mode (no peaking :) )
    if (gridMultiplier < 5) {
        var delay = 400;
    } else delay = 0;
    var shuffleCount = 0;
    var shuffle = setInterval(function() {
        shuffleCount++;
        if (shuffleCount >= 3) {
            clearInterval(shuffle);
        }
        shuffleBoard(numberGrid, numberGrid.empty);
        resetTimer(runningTime);
        runningTime = setInterval(countTimer, 1000);
    }, delay);

    backButton.onclick = function() {
        slidersMenu();
        //ensure gridMultiplier gets changed back if user selected hard mode and exits
        if (currentDifficulty == "Easy") {
            gridMultiplier = 3;
        } else gridMultiplier = 4;
    }
    toggleMusicButton.onclick = function() {
        if (backgroundMusic.paused) {
            backgroundMusic.setAttribute("loop", "true");
            backgroundMusic.volume = 0.45;
            backgroundMusic.play();
        }
        else backgroundMusic.pause();
    }
}

/*
    Main slider creation function
    Takes parameters of the new puzzle array created in gameBoard, the container the puzzle needs to go in, and the grid size
    Loops through 2 loops a number of times according to the grid size to position the elements on the board
    Each loop an image is created and given certain properties to allow for movement, win checking and user feedback
    parameter   puzzleToLoad - the puzzle that has been put into array from gameBoard
    parameter   puzzleContainer - the HTML element that will contain the tile pieces
    parameter   gridSize - the size of the grid, normally replaced with gridMultiplier global variable.
*/
function fillBoard (puzzleToLoad, puzzleContainer, gridSize) {
    //add sound for when user clicks a tile
    var tileClickedSound = new Audio("sounds/tap.mp3");
    tileClickedSound.volume = 0.55S;
    //general counter to go through array
    var counter = 0;
    //two loops to create the grid and assign x and y co-ordinate positions to created elements
    for (var yPosition = 0; yPosition < gridSize; yPosition++) {
        for (var xPosition = 0; xPosition < gridSize; xPosition++) {
            var contentCell = createImage(puzzleToLoad[counter].src, puzzleToLoad[counter].value, "cell");
            var baseDistanceEasy = 33.6;
            var baseDistanceMedium = 25.3;
            var baseDistanceHard = 20.1;
            //set image sizes and positions in div
            if (gridSize == 3) {
                contentCell.style.left = baseDistanceEasy * xPosition + "%";
                contentCell.style.top = baseDistanceEasy * yPosition + '%';
                contentCell.style.width = 32 + "%";
                contentCell.style.height = 32 + "%";
            } else if (gridSize == 4) {
                contentCell.style.left = baseDistanceMedium * xPosition + "%" ;
                contentCell.style.top = baseDistanceMedium * yPosition + '%';
                contentCell.style.width = 24 + "%";
                contentCell.style.height = 24 + "%";
            } else if (gridSize == 5) {
                contentCell.style.left = baseDistanceHard * xPosition + "%" ;
                contentCell.style.top = baseDistanceHard * yPosition + '%';
                contentCell.style.width = 19.5 + "%";
                contentCell.style.height = 19.5 + "%";
            }
            //assign a grid x and y position to enable easier onclick conditions
            contentCell.gridPosition = {
                x: xPosition,
                y: yPosition
            };
            contentCell.value = puzzleToLoad[counter].value;
            puzzleContainer.appendChild(contentCell);
            counter++;
            getEmptyCell(puzzleContainer);
            /*
                checks for valid movement, if valid, piece will move, also checks if player has won
                Plays tap sound for valid moves
            */
            if (contentCell.value < 16 && contentCell.value > 0){
                contentCell.onclick = function() {
                    tileClickedSound.play();
                    boardMovement(this, puzzleContainer.empty);
                    movesTakenDisplayElement.innerHTML = "Moves: " + moves;
                    if (checkWin(puzzleContainer) && moves > 0 && totalSecondsPast > 1) {
                        //if player has won, "completeGrid" class is added, and full puzzle is shown before moving to win screen
                        for (let i = 0; i < puzzleContainer.children.length; i++) {
                            puzzleContainer.classList.add("completeGrid");
                            puzzleContainer.empty.classList.remove("empty");
                            puzzleContainer.children[i].classList.add("complete");
                        }
                        //delay win screen to let user see completed image, pass moves, time and puzzle to winScreen
                        setTimeout(winScreen.bind(null, movesTakenDisplayElement.innerHTML, timerDisplayElement.innerHTML, puzzleToLoad), 2000);
                        if (currentDifficulty == "Easy") {
                            gridMultiplier = 3;
                        } else gridMultiplier = 4;
                    }
                }
            }
        }
    }
}

/*
    Loops through the puzzle and finds the piece with an 'alt' of empty
    The empty tile is them assigned to the '.empty' property of the passed in puzzle
    parameter puzzleBoard - the puzzle being played
*/
function getEmptyCell (puzzleBoard) {
    for (var piece = 0; piece < puzzleBoard.children.length; piece++) {
        if (puzzleBoard.children[piece].alt == "empty") {
            puzzleBoard.children[piece].classList.add("empty");
            puzzleBoard.empty = puzzleBoard.children[piece];
        }
    }
}

/*
    function to move empty cell and clicked cell down or up
    updates both cell's gridPosition's y values and swaps the "alt"
    parameter   contentCell - a cell of the puzzle that is not the emptyCell
    parameter   emptyCell - the empty cell object of the puzzle
*/
function moveDownOrUp (contentCell, emptyCell) {
    //save temp values to swap
    var tempY = contentCell.gridPosition.y;
    var tempYpx = contentCell.style.top;
    var tempAlt = contentCell.alt;
    contentCell.alt = emptyCell.alt;
    emptyCell.alt = tempAlt;
    contentCell.gridPosition.y = emptyCell.gridPosition.y;
    emptyCell.gridPosition.y = tempY;
    contentCell.style.top = emptyCell.style.top;
    emptyCell.style.top = tempYpx;
}

/*
    function to move empty cell and clicked cell to the right or left
    updates both cell's gridPosition's x values and swaps the "alt"
    parameter   contentCell - a cell of the puzzle that is not the emptyCell
    parameter   emptyCell - the empty cell object of the puzzle
*/
function moveLeftOrRight (contentCell, emptyCell) {
    //save temp values to swap
    var tempX = contentCell.gridPosition.x;
    var tempXpx = contentCell.style.left;
    var tempAlt = contentCell.alt;
    contentCell.alt = emptyCell.alt;
    emptyCell.alt = tempAlt;
    contentCell.gridPosition.x = emptyCell.gridPosition.x;
    emptyCell.gridPosition.x = tempX;
    contentCell.style.left = emptyCell.style.left;
    emptyCell.style.left = tempXpx;
}

/*
    This is the function for an onclick listener to cells, it will check if the grid position of the clicked cell contains an
    empty cell directly to the right, left top or bottom of it.
    if it does, one of the statements will run depending on the position of the empty cell
    parameter   contentCell - a cell of the puzzle that is not the emptyCell
    parameter   emptyCell - the empty cell object of the puzzle
*/
function boardMovement (contentCell, emptyCell) {
    //create variables for readability
    var emptyBelow = emptyCell.gridPosition.x == contentCell.gridPosition.x && emptyCell.gridPosition.y - 1 == contentCell.gridPosition.y;
    var emptyAbove = emptyCell.gridPosition.x == contentCell.gridPosition.x && emptyCell.gridPosition.y + 1 == contentCell.gridPosition.y;
    var emptyToLeft = emptyCell.gridPosition.x + 1 == contentCell.gridPosition.x && emptyCell.gridPosition.y == contentCell.gridPosition.y;
    var emptyToRight = emptyCell.gridPosition.x - 1 == contentCell.gridPosition.x && emptyCell.gridPosition.y == contentCell.gridPosition.y;

    //ensure cells for hard mode cant be moved
    if (contentCell.value < 16){
        //empty cell is below clicked cell
        if (emptyBelow) {
            moveDownOrUp(contentCell, emptyCell);
            moves++;
        //empty cell is above clicked cell
        } else if (emptyAbove) {
            moveDownOrUp(contentCell, emptyCell);
            moves++;
        //empty cell is to the right of clicked cell
        } else if (emptyToRight) {
            moveLeftOrRight(contentCell, emptyCell);
            moves++;
        //empty cell is to the left of clicked cell
        } else if (emptyToLeft) {
            moveLeftOrRight(contentCell, emptyCell);
            moves++;
        }
        //to add correct or incorrect feedback --- removed in hard mode.
        if (contentCell.value == contentCell.alt && gridMultiplier < 5) {
            contentCell.classList.add("correct");
            contentCell.classList.remove("wrong");
        } else if (gridMultiplier < 5) {
            contentCell.classList.add("wrong");
            contentCell.classList.remove("correct");
        }
    }
}

/*
    This function is for shuffling the board after it has been created
    Shuffling after the board is set, ensures that the board will always be solvable
    Shuffling with conditions based on the empty cell's x and y also ensure that pieces will be moved
    Max number of moves taken to randomize varies from 150-2500 - runtime feels good
    parameter   puzzleToShuffle - puzzle that is being played
    parameter   emptyCell - the empty cell object of the puzzle
*/
function shuffleBoard(puzzleToShuffle, emptyCell) {
    var getRandomPiece;
    var moveRandomPiece;
    //set max random number to the number of cells -1 to cover all array indexes of a given puzzle
    var limit = (gridMultiplier*gridMultiplier) -1;
    //shuffles valid moves until the empty is at 0,0 (top left) ---- Special shuffle for hard mode, empty lives at (x 3, y 4) and goes to (0,1)
    if(gridMultiplier == 5) {
        while (!(emptyCell.gridPosition.x == 0 && emptyCell.gridPosition.y == 1)){
            getRandomPiece = getRandomInt(0,limit);
            moveRandomPiece = puzzleToShuffle.children[getRandomPiece];
            boardMovement(moveRandomPiece, emptyCell);
        }
        while (!(emptyCell.gridPosition.x == gridMultiplier-2 && emptyCell.gridPosition.y == gridMultiplier-1)) {
            getRandomPiece = getRandomInt(0,limit);
            moveRandomPiece = puzzleToShuffle.children[getRandomPiece];
            boardMovement(moveRandomPiece, emptyCell);
        }
    } else {
        while (!(emptyCell.gridPosition.x == 0 && emptyCell.gridPosition.y == 0)){
            getRandomPiece = getRandomInt(0,limit);
            moveRandomPiece = puzzleToShuffle.children[getRandomPiece];
            boardMovement(moveRandomPiece, emptyCell);
        }
        //shuffles again until empty is back at 2,2 or 4,4 (bottom right)
        while (!(emptyCell.gridPosition.x == gridMultiplier-1 && emptyCell.gridPosition.y == gridMultiplier-1)) {
            getRandomPiece = getRandomInt(0,limit);
            moveRandomPiece = puzzleToShuffle.children[getRandomPiece];
            boardMovement(moveRandomPiece, emptyCell);
        }
    }
}

/*
    Checks over each element in the puzzle to see if the 'alts' match the value assigned
    if loop completes, this function returns true, otherwise false is returned.
    parameter   puzzle - the puzzle being played
*/
function checkWin(puzzle) {
    for (let piece = 0; piece < puzzle.children.length; piece++) {
        if (puzzle.children[piece].alt != puzzle.children[piece].value) return false;
    }
    //updates playerStats if they got a better time or moves made for the difficulty chosen, checks if they have a time or moves taken yet.
    if (gridMultiplier == 3) {
        if (playerStats.easyPuzzleBest.bestMoves == null || moves < playerStats.easyPuzzleBest.bestMoves) {
            playerStats.easyPuzzleBest.bestMoves = moves;
            playerStats.easyPuzzleBest.bestMovesDisplay = "Best " + movesTakenDisplayElement.innerHTML;
        }
        if (playerStats.easyPuzzleBest.bestTime == null || totalSecondsPast < playerStats.easyPuzzleBest.bestTime) {
            playerStats.easyPuzzleBest.bestTime = totalSecondsPast;
            playerStats.easyPuzzleBest.bestTimeDisplay = "Best " + timerDisplayElement.innerHTML;
        }
    } else if (gridMultiplier == 4) {
        if (playerStats.mediumPuzzleBest.bestMoves == null || moves < playerStats.mediumPuzzleBest.bestMoves) {
            playerStats.mediumPuzzleBest.bestMoves = moves;
            playerStats.mediumPuzzleBest.bestMovesDisplay = "Best " + movesTakenDisplayElement.innerHTML;
        }
        if (playerStats.mediumPuzzleBest.bestTime == null || totalSecondsPast < playerStats.mediumPuzzleBest.bestTime) {
            playerStats.mediumPuzzleBest.bestTime = totalSecondsPast;
            playerStats.mediumPuzzleBest.bestTimeDisplay = "Best " + timerDisplayElement.innerHTML;
        }
    } else if (gridMultiplier == 5) {
        if (playerStats.hardPuzzleBest.bestMoves == null || moves < playerStats.hardPuzzleBest.bestMoves) {
            playerStats.hardPuzzleBest.bestMoves = moves;
            playerStats.hardPuzzleBest.bestMovesDisplay = "Best " + movesTakenDisplayElement.innerHTML;
        }
        if (playerStats.hardPuzzleBest.bestTime == null || totalSecondsPast < playerStats.hardPuzzleBest.bestTime) {
            playerStats.hardPuzzleBest.bestTime = totalSecondsPast;
            playerStats.hardPuzzleBest.bestTimeDisplay = "Best " + timerDisplayElement.innerHTML;
        }
    }
    return true;
}
