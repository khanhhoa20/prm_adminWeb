var url_getAppointmentDetail = "https://hair-cut.herokuapp.com/api/appointmentApptID?apptID=";

var url_string = window.location.href;
var url = new URL(url_string);
var txtApptID = url.searchParams.get("id");

//VIEW SUPPORT

function getAppointmentDetailView(_data) {
    var table_data = document.getElementById('appointment-detail');
    var completeDate = getCompleTime(_data.date, _data.startTime);

    table_data.innerHTML += `<tr><td>AppointmentID:</td><td>${_data.apptID}</td></tr>
                                <tr><td>Status:</td><td>${_data.status}</td></tr>
                                <tr><td>Description:</td><td>${_data.description}</td></tr>
                                <tr><td>Customer Email:</td><td>${_data.cusEmail}</td></tr>
                                <tr><td>Employee Email:</td><td>${_data.empEmail}</td></tr>
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


//CONTROLLER

function getAppointmentDetail() {
    fetch(url_getAppointmentDetail + txtApptID, { method: 'GET', headers: { 'Authorization': sessionStorage.token, 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(data => {
            getAppointmentDetailView(data);
            getAppointmentService(data.listService);
        })
}



//EXECUTE
getAppointmentDetail();