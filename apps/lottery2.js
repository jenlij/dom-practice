
//random number generator
function makeRandomInt(max) {
    var num = Math.floor(Math.random() * max) + 1;
    return num;
}


//check if value is in array already
function isInArray(arr, val) {
    return arr.includes(val); //also indexOf === -1 (for IE compatibility)
}

//make array
function fillArray(newArray, len, maxVal) {
    var newNum = 0;
    var counter = len;
    while (counter > 0) {
        newNum = makeRandomInt(maxVal);
        if (isInArray(newArray, newNum) == false) {
            newArray.push(newNum);
            counter--;
        }
    }
    return newArray;
}


//append arrays together
function appendArrays(arr1, arr2) {
    var finalArray = arr1.concat(arr2);
    return finalArray;
}

//gets empty number slots
function getSlots() {
    return $('[data-attribute="num-placeholder"]');
}


//prints value in number slot
function printValues(arr, $slots) {
    $slots.each(function(i){
        $(this).text(arr[i]);
    });
}

//join array
function arrayToString(arr) {
    return arr.join(' ');
}

//print to saved ticket section
function printList(arr) {
    var $newLi = $('<li></li>');
    $newLi.append(arrayToString(arr));
    var $position = $('#myList');
    $position.append($newLi);
}

//putting it all together
function putItAllTogether() {
    var firstFive = [];
    var lastOne = [];
    var firstSection = fillArray(firstFive, 5, 69);
    var lastSection = fillArray(lastOne, 1, 26);
    var fullArray = appendArrays(firstSection, lastSection);
    var $valSlots = getSlots();
    printValues(fullArray, $valSlots);
    printList(fullArray);
}


//event listener for button click
var $getLotto = $('[data-attribute="button"]');
$getLotto.on('click', putItAllTogether);
