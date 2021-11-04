var url_getDiscounts = "https://hair-cut.herokuapp.com/api/discounts";
var url_createDiscounts = "https://hair-cut.herokuapp.com/api/createDiscount";


//valid roi moi fetch check trung, sau do moi create


//VIEW SUPPORT



//UTIL

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

function checkDiscountExisted() {
    var _discountCode = document.getElementById('txtDiscountCode');
    var _discountName = document.getElementById('txtDiscountName');
    var _err = document.getElementById('discount-err');

    fetch(url_getDiscounts, { method: 'GET', headers: { 'Authorization': sessionStorage.token, 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(data => {
            for (var i of data) {
                if (i.discountCode.toUpperCase() == _discountCode.value.toUpperCase()) {
                    _err.innerHTML = '*Discount code existed.'
                    return false;
                } else if (i.discountName.toUpperCase() == _discountName.value.toUpperCase()) {
                    _err.innerHTML = '*Discount name existed.'
                    return false;
                }
                
            }

                return true;
        })
        .then(isSavable =>{
            if(isSavable){
                createDiscount();
            }
        })
}

function createDiscount(){
    var _discountCode = document.getElementById('txtDiscountCode');
    var _discountName = document.getElementById('txtDiscountName');
    var _startDay = document.getElementById('txtStartDay');
    var _endDay = document.getElementById('txtEndDay');
    var _value = document.getElementById('txtValue');

    var data = {
        discountCode: _discountCode.value,
        discountName: _discountName.value,
        startDate: _startDay.value,
        endDate: _endDay.value,
        value: _value.value,
        status: true
    }

    fetch(url_createDiscounts, { method: 'POST', headers: { 'Authorization': sessionStorage.token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then(function(){
        document.getElementById('discount-err').innerHTML = '';
        document.getElementById('discount-success').innerHTML = 'Create success.';
    })
}


//EXECUTE