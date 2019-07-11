/*
    Function to calculate a random value
    Source: https://www.w3schools.com/js/js_random.asp
*/
function getRandomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

window.isString = function(s) {
    return typeof(s) === 'string' || s instanceof String;
}

/*
    function to return a random property of an object, with all of its properties
    tasks an object as parameter, and will return a random key with all it's properties
    Source - https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object - Lawrence Whiteside

    Altered slightly to use as utility on multiple pages
*/
function randomPuzzle(puzzles) {
    var randomPuzzle;
    var keys = Object.keys(puzzles)
    randomPuzzle = puzzles[keys[keys.length * Math.random() << 0]];
    return randomPuzzle;
}
