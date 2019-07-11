window.createHeading1 = function (titleText) {
    var element = document.createElement("H1");
    if (typeof(titleText) !== 'undefined') {
    // the variable does exist, so use it
      var textNode = document.createTextNode(titleText);
      element.appendChild(textNode);
    }
    return element;
}

window.createHeading2 = function (titleText) {
    var element = document.createElement("H2");
    if (typeof(titleText) !== 'undefined') {
    // the variable does exist, so use it
      var textNode = document.createTextNode(titleText);
      element.appendChild(textNode);
    }
    return element;
}

window.createParagraph = function (paraText) {
    var element = document.createElement("P");
    if (typeof(paraText) !== 'undefined') {
    // the variable does exist, so use it
      var textNode = document.createTextNode(paraText);
      element.appendChild(textNode);
    }
    return element;
}

//create div with any potential of elements
window.createDiv = function (...otherElements){
    var mainElement = document.createElement("div");

    //append subelements of an element
    for (var subElement of otherElements){
        if (subElement instanceof HTMLElement){
            mainElement.appendChild(subElement);
        }
        //if the element is a string, make it a text node
        else if(typeof(subElement) == "string"){
            var textNode = document.createTextNode(subElement);
            mainElement.appendChild(textNode);
        //if the element is neither a HTMLElement or string, log element
        } else {
            console.log("Error: create div failed to append; " + subElement)
        }
    }

    return mainElement;
}

window.createImage = function (imageSource, imageAttribute, classes) {
  var image = document.createElement("img");
  image.setAttribute("src", imageSource);
  image.setAttribute("alt", imageAttribute);
  image.classList.add(classes);

  return image;
}

function createButton(buttonText) {
    var element = document.createElement("BUTTON");
    if (typeof(buttonText) !== 'undefined') {
    // the variable does exist, so use it
      var textNode = document.createTextNode(buttonText);
      element.appendChild(textNode);
    }
    return element;
}
