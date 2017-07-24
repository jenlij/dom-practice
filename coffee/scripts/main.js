$(document).ready(function(){
    $theForm = $('[data-coffee-order="form"]')
    //on submit
    $theForm.submit(function() {
        var myOrder = formatData($theForm);
        saveToLocalStorage(myOrder, 'myOrder');
        //add function here to push to order queue
        addOrderToQueue(myOrder, 'orderQueue');
        event.preventDefault();
    });
    //before refresh
    window.onbeforeunload = function(event) {
        var myOrder = formatData($theForm);
        saveToLocalStorage(myOrder, 'myOrder');
    }
});

//after refresh page
window.onload = function() {
        var order = getFromLocalStorage('myOrder');
        $('#coffeeOrder').val(order['coffee']);
        $('#emailInput').val(order['emailAddress']);
        $('#' + order['size']).prop('checked', true);
        $('#flavorShot').val(order['flavor']);
        $('#strengthLevel').val(order['strength']);
        
}

function saveToLocalStorage(arr, orderName) {
    localStorage.setItem(orderName, JSON.stringify(arr));  
}

function getFromLocalStorage(orderName) {
    return JSON.parse(localStorage.getItem(orderName));
}


//gets order from form and creates dictionary
function formatData(dataSource) {
    var orderDictionary = {};
    dataSource.serializeArray().forEach(function(userInput) {
        orderDictionary[userInput.name] = userInput.value;
    });
    return orderDictionary;
}


//add submitted order to order queue
function addOrderToQueue(myOrder, orderQueueName) {
    if (getFromLocalStorage(orderQueueName) == null) {
        var orderHolders = {};
    }
    else {
        var orderHolders = getFromLocalStorage(orderQueueName);
    }
    orderHolders[myOrder['emailAddress']] = myOrder;
    saveToLocalStorage(orderHolders, orderQueueName);
}

//print order queue to order table
function printOrderQueue(orderQueue) {

}
