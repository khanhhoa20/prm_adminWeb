var url_getAppointmentDetail = "https://hair-cut.herokuapp.com/api/appointmentApptID?apptID=";
var url_getFeedback = "https://hair-cut.herokuapp.com/api/feedbackApptID?apptID=";

var url_string = window.location.href;
var url = new URL(url_string);
var txtApptID = url.searchParams.get("id");

//VIEW SUPPORT

function getAppointmentDetailView(_data) {
    var table_data = document.getElementById('appointment-detail');
    var completeDate = getCompleTime(_data.date, _data.startTime);

    table_data.innerHTML += `<tr><td>AppointmentID:</td><td>${_data.apptID}</td></tr>
                                <tr><td>Status:</td><td id="appointment-status-140562">${_data.status}</td></tr>
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

function getFeedbackView(_data) {
    var _feedbackData = document.getElementById('feedback-data');
    _feedbackData.innerHTML += `<div class="border rounded p-3">
                                <div class="mb-3">
                                <h6 style="font-weight: 600;">${_data.cusEmail}</h6>
                                </div>
                                <div class="mb-2">
                                ${getRating(_data.rating)}
                                </div>
                                <div class="mb-2">
                                    <span>${_data.comment}</span>
                                </div>
                                </div>`;
}

function getRating(_data) {

    var _styledEmotions = ['',
        '<span style="color: #f44235;" class="material-icons">sentiment_very_dissatisfied</span>',
        '<span style="color: #ff5454;" class="material-icons">sentiment_dissatisfied</span>',
        '<span style="color: #ffc100;" class="material-icons">sentiment_neutral</span>',
        '<span style="color: #8bc34a;" class="material-icons">sentiment_satisfied</span>',
        '<span style="color: #4caf50;" class="material-icons">sentiment_very_satisfied</span>'];

    var _stylelessEmotions = ['',
        '<span style="color: #bbbbbb;" class="material-icons">sentiment_very_dissatisfied</span>',
        '<span style="color: #bbbbbb;" class="material-icons">sentiment_dissatisfied</span>',
        '<span style="color: #bbbbbb;" class="material-icons">sentiment_neutral</span>',
        '<span style="color: #bbbbbb;" class="material-icons">sentiment_satisfied</span>',
        '<span style="color: #bbbbbb;" class="material-icons">sentiment_very_satisfied</span>'];

    var result = '';
    var _stylelessEmotionStart = _data;

    for (var i = 0; i <= _data; i++) {
        result += _styledEmotions[i];
    }

    for (var i = _data + 1; i <= 5; i++) {
        result += _stylelessEmotions[i];
    }

    return result;
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
        .then(function () {
            getFeedback();
        })
}

function getFeedback() {
    var _currentAppointmentStatus = document.getElementById('appointment-status-140562');

    if (_currentAppointmentStatus.innerHTML == 'DONE') {
        fetch(url_getFeedback + txtApptID, { method: 'GET', headers: { 'Authorization': sessionStorage.getItem('token'), 'Content-Type': 'application/json' } })
            .then(res => res)
            .then(res1 => {
                if (res1.status == 200) {
                    return res1.json();
                } else {
                    throw new Error();
                }
            })
            .then(data => getFeedbackView(data))
    }

}

//EXECUTE
getAppointmentDetail();