$(document).ready(function(){
    $theForm = $('[data-coffee-order="form"]')
    //on submit
    $theForm.submit(function() {
        var myOrder = formatData($theForm);
        saveToLocalStorage(myOrder, 'myOrder');
        console.log(getFromLocalStorage('myOrder'));
        event.preventDefault();
    });
    //before refresh
    window.onbeforeunload = function(event) {
        var myOrder = formatData($theForm);
        saveToLocalStorage(myOrder, 'myOrder');
        return "refresh"
    }
    //after refresh page
    window.onload= function(event) {
        var myOrder = formatData($theForm);
        autofill(myOrder)
    }
});

function saveToLocalStorage(arr, orderName) {
    localStorage.setItem(orderName, JSON.stringify(arr));  
}
//this isn't working
function getFromLocalStorage(orderName) {
    return JSON.parse(localStorage.getItem(orderName));
}

function autofill(orderName) {
    
}

function allOrders() {

}
//gets order from form and creates dictionary
function formatData(dataSource) {
    var orderDictionary = {};
    dataSource.serializeArray().forEach(function(userInput) {
        orderDictionary[userInput.name] = userInput.value;
    });
    return orderDictionary;
}
