var url_getAppointments = "https://hair-cut.herokuapp.com/api/appointments";

//VIEW SUPPORT

function getOnProcessAppointmentNotifiView(_data) {
    var noti_content = document.getElementById('noti-content-140562');
    var noti_number = document.getElementById('notifi-number-140562');
    var count = 0;

    if (noti_content.style.display == 'none') {
        for (var i = _data.length - 1; i >= 0; i--) {
            if (_data[i].status == 'ON PROCESS') {
                count++;
            }
        }

        if (count > 0) {
            noti_number.innerHTML = count;
            noti_number.style.display = 'inline-block';
        }
    }
}

function getOnProcessAppointmentNotifiContentView(_data) {
    var noti_content = document.getElementById('noti-content-140562');
    var isOnProcess = false;
    noti_content.innerHTML = '';

    for (var i = _data.length - 1; i >= 0; i--) {
        if (_data[i].status == 'ON PROCESS') {
            noti_content.innerHTML += `<div class="p-2 m-3 border-bottom"><a class="text-dark text-decoration-none" href="appointment-arrange.html?id=${_data[i].apptID}">New appointment. Id ${_data[i].apptID}</a></div>`;
            isOnProcess = true;
        }
    }
    if (!isOnProcess) {
        noti_content.innerHTML += '<div class="p-2 m-3 ">You don\'t have any upcoming appointment.</div>';
    }




}

function changeNotiDisplay() {
    var noti_content = document.getElementById('noti-content-140562');
    var noti_number = document.getElementById('notifi-number-140562');

    if (noti_content.style.display == 'none') {
        noti_content.style.display = 'inline-block';
        noti_number.style.display = 'none';
    } else {
        noti_content.style.display = 'none';
    }
}


//UTIL


//CONTROLLER

function getOnProcessAppointmentNotifi() {
    fetch(url_getAppointments, { method: "GET", headers: { 'Authorization': sessionStorage.token, 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(data => {
            getOnProcessAppointmentNotifiView(data);
            getOnProcessAppointmentNotifiContentView(data);
        })
}

//EXECUTE

getOnProcessAppointmentNotifi();

setInterval(getOnProcessAppointmentNotifi, 5000);