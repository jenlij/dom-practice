//constants
[data-target] {}
[data-target="trigger"] {}

//variables
//helper functions
//main function

function toArray(nodeList) {
var arr = nodeList;
if (nodeList.forEach === undefined) {
arr = [].slice.call(nodeList);
}
return arr;
}