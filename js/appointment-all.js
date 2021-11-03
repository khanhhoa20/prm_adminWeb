var url_getAppointments = "https://hair-cut.herokuapp.com/api/appointments";

//VIEW SUPPORT

function getOnProcessAppointmentView(_data) {
    var table_data = document.getElementById('table-data');
    table_data.innerHTML = '';

    for (var i = _data.length - 1; i >= 0; i--) {
        var _date = getCompleTime(_data[i].date, _data[i].startTime);
        table_data.innerHTML += `<tr class="pages-search">
                                    <td>${_data[i].apptID}</td>
                                    <td>${_data[i].cusEmail}</td>
                                    <td>${_date}</td>
                                    <td>${_data[i].totalPrice}</td>
                                    <td style="font-weight: 500;" class="${getColor(_data[i].status)}">${_data[i].status}</td>
                                    <td>
                                        <a class="btn btn-light border" href="appointment-detail.html?id=${_data[i].apptID}">Details</a>
                                    </td>
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

function getColor(_status) {
    var color = '';

    switch (_status) {
        case 'ON PROCESS':
            color = 'text-warning';
            break;
        case 'ACCEPT':
            color = 'text-accept';
            break;
        case 'DENY':
            color = 'text-danger';
            break;
        case 'CANCEL BY CUSTOMER':
            color = 'text-danger';
            break;
        case 'DONE':
            color = 'text-done';
            break;
    }

    return color;
}

function displayPage(_page) {
    var PAGE_SIZE = 10;
    var START = (_page - 1) * PAGE_SIZE;
    var END = _page * PAGE_SIZE - 1;
    var _data = document.getElementsByClassName('pages-search');

    for(var p of _data){
        p.classList.add('hidden');
    }

    for(var i = START; i <= END; i++){
        _data[i].classList.remove('hidden');
    }
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
            // displayPage(1);
        })
}


//EXECUTE
getOnProcessAppointment();
