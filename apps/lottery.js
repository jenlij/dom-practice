// //make array of numbers from 0 to n-1
// function makeRange(n) {
//     return Array.apply(null, {length: n}).map(Number.call, Number);    
// }
// //values allowed for first 5 spots
// var firstFiveOptions = makeRange(70);
// firstFiveOptions.shift(); //removes 0

// //values allowed for last spot
// var lastOption = makeRange(27);
// lastOption.shift(); //removes 0

//random number generator
function makeRandomInt(max) {
    var num = Math.floor(Math.random() * max) + 1;
    return num;
}


//check if value is in array already
function isInArray(arr, val) {
    return arr.includes(val);
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
    return document.querySelectorAll('[data-attribute="num-placeholder"]')
}


//prints value in number slot
function printValues(arr, slots) {
    for (var i = 0; i < arr.length; i++) {
        slots[i].textContent = arr[i];
    }
}

//putting it all together
function putItAllTogether() {
    var firstFive = [];
    var lastOne = [];
    var firstSection = fillArray(firstFive, 5, 69);
    var lastSection = fillArray(lastOne, 1, 26);
    var fullArray = appendArrays(firstSection, lastSection);
    var valSlots = getSlots();
    printValues(fullArray, valSlots);
}


//event listener for button click
var getLotto = document.querySelector('[data-attribute="button"]');
getLotto.addEventListener('click', putItAllTogether, false);
