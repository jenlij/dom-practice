// This version is for ajax practice

var URL = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders';
$(document).ready(function(){
    $theForm = $('[data-coffee-order="form"]')
    //on submit
    $theForm.submit(function() {
        var myOrder = formatData($theForm);
        saveToLocalStorage(myOrder, 'myOrder');
        //add function here to push to order queue
        addOrderToQueue(myOrder, 'orderQueue');
        sendDataToServer(URL, myOrder);
        //print order queue
        printMyOrder(myOrder);
        deleteSelected();
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
    getServerData(URL, 'fromServer');
    printOrderQueue('orderQueue');        
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
function printOrderQueue(orderQueueName) {
    var $table = $('[name=tableBody]');
    var orderQueue = getFromLocalStorage(orderQueueName);
    var $tr = '';
    var $email = '';
    var $coffee = '';
    var $size = '';
    var $flavor = '';
    var $strength = '';
    Object.keys(orderQueue).forEach(function(key){
        $tr = $('<tr>');
        $email = $('<td>' + myOrder['emailAddress'] + '</td>');
        $coffee = $('<td>' + orderQueue[key]['coffee'] + '</td>');
        $size = $('<td>' + orderQueue[key]['size'] + '</td>');
        $flavor = $('<td>' + orderQueue[key]['flavor'] + '</td>');
        $strength = $('<td>' + orderQueue[key]['strength'] + '</td>');
        $tr.append($('<td><input type="checkbox" id=' + myOrder['emailAddress'] + '></td>'));
        $tr.append($email).append($coffee).append($size).append($flavor).append($strength);
        $table.append($tr);
    });
}

function printMyOrder(myOrder) {
    var $table = $('[name=tableBody]');
    var $tr = '';
    var $email = '';
    var $coffee = '';
    var $size = '';
    var $flavor = '';
    var $strength = '';
    $tr = $('<tr>');
    $email = $('<td>' + myOrder['emailAddress'] + '</td>');
    $coffee = $('<td>' + myOrder['coffee'] + '</td>');
    $size = $('<td>' + myOrder['size'] + '</td>');
    $flavor = $('<td>' + myOrder['flavor'] + '</td>');
    $strength = $('<td>' + myOrder['strength'] + '</td>');
    $tr.append($('<td><input type="checkbox" id=' + myOrder['emailAddress'] + '></td>'));
    $tr.append($email).append($coffee).append($size).append($flavor).append($strength);
    $table.append($tr);
}

//ajax section

//This function should make an Ajax call to the server to retrieve the coffee orders.
//Additionally, it could accept a callback function that is called when the server response comes in.
function getServerData(URL, keyName) {
    return $.get(URL, function (data) {
        saveToLocalStorage(data, keyName);
    });
}

//This function should make an Ajax call to the server, sending it coffee order information.
function sendDataToServer(URL, data) {
    return $.post(URL, data, function(resp){console.log(resp);});
}


//delete checked orders
function deleteSelected() {
    $('#delete').click(function(){
        $('td input:checked').closest('tr').remove();
        $.each($('td input:checked'),function(index, item){
            console.log(item.getAttribute('id'));
        });
        // return $.ajax( {
        // url: URL + '/' + id,
        // method: 'DELETE'
        // }); 
    });
}


