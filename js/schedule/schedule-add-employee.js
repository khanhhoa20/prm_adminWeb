var url_Strings = window.location.href;
var urls = new URL(url_Strings);
var schlIdForAdd = urls.searchParams.get('id');

var url_Employees = 'https://hair-cut.herokuapp.com/api/employees';
var url_updateEmployeeSchedule = 'https://hair-cut.herokuapp.com/api/updateEmployeeScheduleCustom';


//VIEW SUPPORT

function getEmployeeStatusTrueView(_data) {
    var _checkContainer = document.getElementById('check-container');
    _checkContainer.innerHTML = '';

    var employees = getEmployeeList();

    for (var i of _data) {
        if (i.status && !employees.includes(i.empEmail)) {
            _checkContainer.innerHTML += `<div class="mb-1"><input type="checkbox" class="emp-email-to-add form-check-input" value="${i.empEmail}">
                                        <label>${i.empEmail}</label></div>`;
        }
    }
}



//UTIL

function getEmployeeList() {
    var _employeesEmail = document.getElementsByClassName('emloyees-email');
    var list = [];

    for (var i of _employeesEmail) {
        list.push(i.innerHTML);
    }

    return list;
}

function getEmployeesObject() {
    var _employeesChecked = document.getElementsByClassName('emp-email-to-add');
    var _employees = '';
    for (var i of _employeesChecked) {
        if (i.checked) {
            _employees += i.value + ',';
        }
    }

    if (_employees.includes(',')) {
        _employees = _employees.substring(0, _employees.length - 1);
    }

    console.log(_employees);
    return _employees;
}

// CONTROLLER

function getEmployeeStatusTrue() {
    fetch(url_Employees, { method: 'GET', headers: { 'Authorization': sessionStorage.getItem('token'), 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(data => {
            getEmployeeStatusTrueView(data);
        })
}

function updateEmloyeeSchedule() {

    var _employees = getEmployeesObject();

    let form = new FormData();
    form.append('employeesEmail', _employees);
    form.append('scheduleID', schlIdForAdd);

    fetch(url_updateEmployeeSchedule, { method: 'PUT', headers: { 'Authorization': sessionStorage.getItem('token') }, body: form })
    .then(res => {
        if(res.status == 200){
            alert('Update Schedule for employees success.')
            location.reload();
        }
    })

}

// EXECUTE