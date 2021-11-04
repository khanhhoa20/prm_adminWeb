var url_getAppointments = "https://hair-cut.herokuapp.com/api/appointments";
var firstLoad = true;
//VIEW SUPPORT

function getOnProcessAppointmentView(_data) {
    var table_data = document.getElementById('table-data');
    table_data.innerHTML = '';

    for (var i = _data.length - 1; i >= 0; i--) {
        if (_data[i].status == 'ON PROCESS') {
            var _date = getCompleTime(_data[i].date, _data[i].startTime);
            table_data.innerHTML += `<tr>
                                    <td>${_data[i].apptID}</td>
                                    <td>${_data[i].cusEmail}</td>
                                    <td>${_date}</td>
                                    <td>${_data[i].totalPrice}</td>
                                    <td>${_data[i].totalDuration}</td>
                                    <td><a class="btn btn-primary" href="appointment-arrange.html?id=${_data[i].apptID}">Arrange</a></td>
                                </tr>`;
        }
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

function getOnProcessAppointment() {
    fetch(url_getAppointments, { method: "GET", headers: { 'Authorization': sessionStorage.token, 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(data => {
            getOnProcessAppointmentView(data);
        })
        .then(function () {
            document.getElementById('loader').style.display = 'none';
        })
}




//EXECUTE
getOnProcessAppointment();

setInterval(getOnProcessAppointment, 5000);
    