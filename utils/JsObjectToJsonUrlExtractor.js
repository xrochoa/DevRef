var data = {
    dataObject: 'dataObjectValue'
};

var dataAsString = JSON.stringify(data);

var url = 'data:text/json;charset=utf8,' + encodeURIComponent(dataAsString);

window.open(url, '_blank');
window.focus();