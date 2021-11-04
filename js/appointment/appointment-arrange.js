var url_getAppointmentDetail = "https://hair-cut.herokuapp.com/api/appointmentApptID?apptID=";
var url_getAppointmentEmployee = "https://hair-cut.herokuapp.com/api/matchingEmployee";
var url_updateAppointmentStatus = "https://hair-cut.herokuapp.com/api/updateAppointmentStatus";

var url_string = window.location.href;
var url = new URL(url_string);
var txtApptID = url.searchParams.get("id");

//VIEW SUPPORT

function getAppointmentDetailView(_data) {
    var table_data = document.getElementById('appointment-detail');
    var completeDate = getCompleTime(_data.date, _data.startTime);

    if (_data.status == 'DENY' || _data.status == 'ACCEPT') {
        document.getElementById('btn-update-status-accept').disabled = 'true';
        document.getElementById('btn-update-status-deny').disabled = 'true';
        document.getElementById('emp-select').disabled = 'true';
    }

    table_data.innerHTML += `<tr><td>AppointmentID:</td><td>${_data.apptID}</td></tr>
                                <tr><td>Status:</td><td>${_data.status}</td></tr>
                                <tr><td>Description:</td><td>${_data.description}</td></tr>
                                <tr><td>Customer Email:</td><td>${_data.cusEmail}</td></tr>
                                <tr><td>Total Price:</td><td>${_data.totalPrice}</td></tr>
                                <tr><td>Total Duration:</td><td>${_data.totalDuration}</td></tr>
                                <tr><td>Start Time:</td><td>${completeDate}</td></tr>
                                <tr><td>discountCode:</td><td>${_data.discountCode}</td></tr>`;
}

function getAppointmentService(_data) {
    var table_data = document.getElementById('appointment-services');
    for (var i of _data) {
        table_data.innerHTML += `<tr>
                                <td>${i.serviceID}</td>
                                <td>${i.serviceName}</td>
                                <td>${i.price}</td>
                                </tr>`;
    }
}

function getEmployeeForAppointmentView(_data) {
    var select_data = document.getElementById('emp-select');
    for (var i of _data) {
        select_data.innerHTML += `<option value="${i.empEmail}">${i.empEmail}</option>`;
    }
}

//UTIL

function getCompleTime(_date, _time) {
    var _dates = _date.split('T');
    var _times = _time.split('T');
    var _timess = _times[1].split('.');
    var _justTime = _timess[0];
    var _justDate = _dates[0];
    var result = _justDate + ' ' + _justTime;

    return result;
}

function checkEmployeeEmail() {
    var empEmail = document.getElementById('emp-select');

    if (empEmail.value == '') {
        alert('Please select employee.');
    } else {
        updateAppointmentStatusAccept();
    }
}

//CONTROLLER

function getAppointmentDetail() {
    fetch(url_getAppointmentDetail + txtApptID, { method: 'GET', headers: { 'Authorization': sessionStorage.token, 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(data => {
            getAppointmentDetailView(data);
            getAppointmentService(data.listService);
        })
}

function getEmployeeForAppointment() {
    var data = {
        apptID: txtApptID
    }

    fetch(url_getAppointmentEmployee, { method: 'POST', headers: { 'Authorization': sessionStorage.token, 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(res => res.json())
        .then(data => {
            getEmployeeForAppointmentView(data);
        })
}

function updateAppointmentStatusAccept() {
    let form = new FormData();
    form.append('apptID', txtApptID);
    form.append('empEmail', document.getElementById('emp-select').value);
    form.append('status', 'ACCEPT');
    form.append('description', null);

    fetch(url_updateAppointmentStatus, { method: 'PUT', headers: { 'Authorization': sessionStorage.token }, body: form })
        .then(function () {
            alert('appointment accepted.');
            location.reload();
        })
}

function updateAppointmentStatusDeny() {

    let form = new FormData();
    form.append('apptID', txtApptID);
    form.append('empEmail', null);
    form.append('status', 'DENY');
    form.append('description', document.getElementById('reason-select').value);

    fetch(url_updateAppointmentStatus, { method: 'PUT', headers: { 'Authorization': sessionStorage.token }, body: form })
        .then(function () {
            alert('appointment denied.');
            location.reload();
        })
}

//EXECUTE
getAppointmentDetail();
getEmployeeForAppointment()