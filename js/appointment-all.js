var url_getAppointments = "https://hair-cut.herokuapp.com/api/appointments";

//VIEW SUPPORT

function getOnProcessAppointmentView(_data) {
    var table_data = document.getElementById('table-data');
    table_data.innerHTML = '';

    for (var i = _data.length - 1; i >= 0; i--) {
        var _date = getCompleTime(_data[i].date, _data[i].startTime);
        table_data.innerHTML += `<tr class="pages search ${_data[i].cusEmail}">
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

function getPageNumber() {
    var PAGE_SIZE = 10;
    var totalPages = 0;
    var _data = document.getElementsByClassName('search');
    var page_number = document.getElementById('page-number');

    pages = (_data.length - _data.length % PAGE_SIZE) / PAGE_SIZE;
    if (_data.length % PAGE_SIZE != 0) {
        pages++;
    }
    totalPages = pages;

    page_number.innerHTML = '';
    for (var i = 1; i <= totalPages; i++) {
        page_number.innerHTML += `<button class="btn btn-primary ms-2" onclick="displayPage('${i}')">${i}</button>`;
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
    var _data = document.getElementsByClassName('pages');
    var _data_search = document.getElementsByClassName('search');

    //HIDE ALL DATA
    for (var p of _data) {
        p.classList.add('hidden');
    }

    //ADD CLASS FOR SEARCH DATA, DISABLE SEARCH DATA
    if(END > _data_search.length){
        END = _data_search.length-1;
    }
    for (var i = START; i <= END; i++) {
        _data_search[i].classList.remove('hidden');
    }
}

function searchAppointmentByCustomerEmail() {

    var _input_data = document.getElementById('txtSearchByCusEmail').value;

    var _data = document.getElementsByClassName('pages');

    if (_input_data == '') {
        for (var i of _data) {
            i.classList.add('search');
        }
    } else {
        for (var i of _data) {
            i.classList.remove('search');
        }

        for (i of _data) {
            if (i.classList.contains(_input_data)) {
                i.classList.add('search');
            }
        }
    }

    displayPage(1);
    getPageNumber();
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
            // searchAppointmentByCustomerEmail('');
            displayPage(1);
            getPageNumber();
        })
}


//EXECUTE
getOnProcessAppointment();
