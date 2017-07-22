$(document).ready(function(){
    $theForm = $('[data-coffee-order="form"]')
    //on submit
    $theForm.submit(function() {
        var myOrder = formatData($theForm);
        saveToLocalStorage(myOrder, 'myOrder');
        //console.log(getFromLocalStorage('myOrder'));
        event.preventDefault();
    });
    //before refresh
    window.onbeforeunload = function(event) {
        var myOrder = formatData($theForm);
        saveToLocalStorage(myOrder, 'myOrder');
    }
    //after refresh page
    window.addEventListener('load', function() {
        var order = getFromLocalStorage('myOrder');
        $('#coffeeOrder').val(order['coffee']);
         event.preventDefault();
    });
});
function saveToLocalStorage(arr, orderName) {
    localStorage.setItem(orderName, JSON.stringify(arr));  
}

function getFromLocalStorage(orderName) {
    return JSON.parse(localStorage.getItem(orderName));
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

