var url_getDiscounts = "https://hair-cut.herokuapp.com/api/discounts";
var url_updateDiscount = "https://hair-cut.herokuapp.com/api/updateDiscount";


var url_string = window.location.href;
var url = new URL(url_string);
var txtDiscountCode = url.searchParams.get("id");

//VIEW SUPPORT

function getDisCountDetailView(_data) {
    var _discountCode = document.getElementById('txtDiscountCode');
    var _discountName = document.getElementById('txtDiscountName');
    var _startDay = document.getElementById('txtStartDay');
    var _endDay = document.getElementById('txtEndDay');
    var _value = document.getElementById('txtValue');
    var _status = document.getElementById('txtStatus');

    getDateFormat(_data.startDate);

    _discountCode.value = _data.discountCode;
    _discountName.value = _data.discountName;
    _startDay.value = getDateFormat(_data.startDate);
    _endDay.value = getDateFormat(_data.endDate);
    _value.value = _data.value;
    _status.value = _data.status;
}

//UTIL

function getDateFormat(_date) {
    var _dateSplitT = _date.split('T');
    return _dateSplitT[0];
}

function discountValidation() {
    var _discountCode = document.getElementById('txtDiscountCode');
    var _discountName = document.getElementById('txtDiscountName');
    var _startDay = document.getElementById('txtStartDay');
    var _endDay = document.getElementById('txtEndDay');
    var _value = document.getElementById('txtValue');
    var _err = document.getElementById('discount-err');
    var _success = document.getElementById('discount-success');

    _success.innerHTML = '';

    if (_discountCode.value == '' || _discountName.value == '' || _startDay.value == '' || _endDay.value == '' || _value.value == '') {
        _err.innerHTML = '*Please fill all field.';
        return false;
    } else {
        if (Date.parse(_startDay.value) >= Date.parse(_endDay.value)) {
            _err.innerHTML = '*Start day must lower than end day.';
            return false;
        } else if (_value.value < 1 || _value.value > 100) {
            _err.innerHTML = '*value from 1 to 100.';
            return false;
        } else {
            checkDiscountExisted();
        }
    }
}


//CONTROLLER

function getDisCountDetail() {

    fetch(url_getDiscounts, { method: 'GET', headers: { 'Authorization': sessionStorage.token, 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(data => {
            for (var i of data) {
                if (i.discountCode == txtDiscountCode) {
                    getDisCountDetailView(i);
                    return;
                }
            }
        })
}

function checkDiscountExisted() {
    var _discountCode = document.getElementById('txtDiscountCode');
    var _discountName = document.getElementById('txtDiscountName');
    var _err = document.getElementById('discount-err');

    fetch(url_getDiscounts, { method: 'GET', headers: { 'Authorization': sessionStorage.token, 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(data => {
            for (var i of data) {
                if (i.discountName.toUpperCase() == _discountName.value.toUpperCase()) {
                    _err.innerHTML = '*Discount name existed.'
                    return false;
                }
            }
            return true;
        })
        .then(isSavable => {
            if (isSavable) {
                updateDiscount();
            }
        })
}


function updateDiscount(){
    var _discountCode = document.getElementById('txtDiscountCode');
    var _discountName = document.getElementById('txtDiscountName');
    var _startDay = document.getElementById('txtStartDay');
    var _endDay = document.getElementById('txtEndDay');
    var _value = document.getElementById('txtValue');
    var _status = document.getElementById('txtStatus');

    var data = {
        discountCode: _discountCode.value,
        discountName: _discountName.value,
        startDate: _startDay.value,
        endDate: _endDay.value,
        value: _value.value,
        status: _status.value
    }

    fetch(url_updateDiscount, { method: 'PUT', headers: { 'Authorization': sessionStorage.token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then(function(){
        document.getElementById('discount-err').innerHTML = '';
        document.getElementById('discount-success').innerHTML = 'Update success.';
    })
}


//EXECUTE

getDisCountDetail();