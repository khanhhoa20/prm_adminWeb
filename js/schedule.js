var token = sessionStorage.getItem('token');

var totalPages = 0;

//URL
var url_getAllSchedule = 'https://hair-cut.herokuapp.com/api/schedules';
var url_createSchedule = 'https://hair-cut.herokuapp.com/api/createSchedule';
var url_updateSchedule = 'https://hair-cut.herokuapp.com/api/updateSchedule';
var url_updateScheduleStatus = 'https://hair-cut.herokuapp.com/api/updateScheduleStatus';




//VIEW SUPPORT
function getAllScheduleView(data) {
    var table_data = document.getElementById('table-data');
    var result = '';
    var PAGESIZE = 10;
    var page = 1;
    for (var i = 0; i < data.length; i++) {

        if (i > 0 && i % PAGESIZE == 0) {
            page++;
        }

        result += `<tr class="page-${page} ${page == 1 ? '' : 'hidden'}">
                    <td>${data[i].scheduleID}</td>
                    <td>${getTimeString(data[i].startTime)}</td>
                    <td>${getTimeString(data[i].endTime)}</td>
                    <td>${data[i].status ? `<button class="btn btn-danger" onclick ="showUpdateStatusModal('${data[i].scheduleID}', '${data[i].status}')">Remove</button>` : `<button class="btn btn-success"  onclick ="showUpdateStatusModal('${data[i].scheduleID}', '${data[i].status}')">Restore</button>`}</td>
                    <td><button class="btn btn-primary" onclick="showUpdateModal('${data[i].scheduleID}', '${getTimeString(data[i].startTime)}', '${getTimeString(data[i].endTime)}')">Update</button></td>
                    <td><a class="btn btn-light border" href="scheduleDetail.html?id=${data[i].scheduleID}">Details</a></td>
                    </tr>`;
    }
    table_data.innerHTML += result;
}

function displayPageNumber() {
    getPages().then(pages => {
        var pageContainer = document.getElementById('page-number-container');
        for (var i = 1; i <= pages; i++) {
            pageContainer.innerHTML += `<button class="btn btn-primary me-1" onclick="displayPage('${i}')">${i}</button>`;
        }
    })
}



function displayPage(pageDisplayed) {

    var pageDataDisplayed = document.getElementsByClassName('page-' + pageDisplayed);
    for (var page of pageDataDisplayed) {
        page.classList.remove('hidden');
    }

    for (var i = 1; i <= totalPages; i++) {
        if (i != pageDisplayed) {
            console.log(pageDisplayed);
            var pageData = document.getElementsByClassName('page-' + i);
            for (var page of pageData) {
                page.classList.add('hidden');
            }
        }
    }
}


//UTIL

function reload() {
    location.reload();
}

function getTimeString(str) {
    var splitT = str.split('T');
    var splitDot = splitT[1].split('.');
    return splitDot[0];
}


function showGeneralModal(mess) {
    document.getElementById('myModal-general').style.display = 'block';
    document.getElementById('modal-general-mess').innerHTML = mess;
}


function showCreateModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = 'block';
}

function hideCreateModal() {
    var modal = document.getElementById("myModal");
    var startTime = document.getElementById('start-time');
    var endtime = document.getElementById('end-time');
    var createErr = document.getElementById('create-err');

    startTime.value = '';
    endtime.value = '';
    createErr.innerHTML = '';
    modal.style.display = 'none';
}

function showUpdateModal(scheduleId, startTime, endTime) {
    var modal = document.getElementById("myModal-update");
    modal.style.display = 'block';

    document.getElementById('start-time-update').value = startTime;
    document.getElementById('end-time-update').value = endTime;
    document.getElementById('schedule-id-update').value = scheduleId;
}

function hideUpdateModal() {
    document.getElementById('update-err').innerHTML = '';
    document.getElementById('myModal-update').style.display = 'none';
}

function showUpdateStatusModal(id, status) {
    document.getElementById('btn-update-status').setAttribute('onclick', `updateScheduleStatus('${id}', '${status}')`);
    if(status == 'true'){
        document.getElementById('modal-update-status-mess').innerHTML = 'Remove this schedule';
    }else if(status == 'false'){
        document.getElementById('modal-update-status-mess').innerHTML = 'Restore this schedule';
    }
    document.getElementById('myModal-update-status').style.display = 'block';

}

function alertsm(id) {
    alert(id);
}

function scheduleValidation(_start, _end, _mess) {
    var startTime = document.getElementById(_start);
    var endtime = document.getElementById(_end);
    var createErr = document.getElementById(_mess);


    if ((startTime.value === '') || (endtime.value === '')) {
        createErr.innerHTML = '*Start time and end time cannot empty.';
    } else {
        var STARTTIMELIMIT = Date.parse(`04 Dec 1995 7:00:00 GMT`);
        var ENDTIMELIMIT = Date.parse(`04 Dec 1995 18:00:00 GMT`);
        var _start = Date.parse(`04 Dec 1995 ${startTime.value} GMT`);
        var _end = Date.parse(`04 Dec 1995 ${endtime.value} GMT`);

        if (_start >= _end) {
            createErr.innerHTML = '*End time must greater than start time.';
        } else if (_start < STARTTIMELIMIT) {
            createErr.innerHTML = '*Start time must greater than 7:00:00.';
        } else if (_end > ENDTIMELIMIT) {
            createErr.innerHTML = '*END time must lower than 18:00:00.';
        } else {
            return true;
        }
    }
    return false;
}

function simpleCovertTime(inputTime) {
    var result = '';
    if (inputTime.length < 8) {
        result = '0' + inputTime;
    } else {
        result = inputTime;
    }
    return result;
}

function convertTime(inputTime) {
    var result = '';
    result = simpleCovertTime(inputTime);
    result = `2021-02-02T${result}.000+00:00`;
    return result;
}

function checkScheduleExisted(data, _start, _end, _mess) {
    var startTime = document.getElementById(_start);
    var endTime = document.getElementById(_end);

    var _startTime = simpleCovertTime(startTime.value);
    var _endTime = simpleCovertTime(endTime.value);

    for (var s of data) {
        if (getTimeString(s.startTime) == _startTime && getTimeString(s.endTime) == _endTime) {
            document.getElementById(_mess).innerHTML = '*Schedule Existed';
            return true;
        }
    }
    return false;
}

//CONTROLLER
function getAllSchedule() {
    fetch(url_getAllSchedule, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(data => {
            getAllScheduleView(data);
        })
        .then(function () {
            document.getElementById('loader').style.display = 'none';
            var loaderItem = document.getElementsByClassName('loader-item');
            for (var i of loaderItem) {
                i.classList.add('hidden')
            }
        })
}

function createSchedule() {
    var startTime = document.getElementById('start-time');
    var endTime = document.getElementById('end-time');

    var _startTime = convertTime(startTime.value);
    var _endTime = convertTime(endTime.value);


    var _data = {
        startTime: _startTime,
        endTime: _endTime,
        status: true
    }


    fetch(url_createSchedule, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .then(function () {
            hideCreateModal();
            // reload();
            showGeneralModal('Create successful.');
        })
}

function updateSchedule() {
    var startTime = document.getElementById('start-time-update');
    var endTime = document.getElementById('end-time-update');
    var id = document.getElementById('schedule-id-update').value;
    var _startTime = convertTime(startTime.value);
    var _endTime = convertTime(endTime.value);


    var _data = {
        scheduleID: id,
        startTime: _startTime,
        endTime: _endTime
    }

    console.log(_data);

    fetch(url_updateSchedule, {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .then(function () {
            hideUpdateModal();
            showGeneralModal('Update successful');
        })
}

function checkScheduleRequirement(_start, _end, _mess, _status) {

    var checkExisted = true;
    var scheduleValid = false;


    fetch(url_getAllSchedule, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(data => {
            checkExisted = checkScheduleExisted(data, _start, _end, _mess);
            scheduleValid = scheduleValidation(_start, _end, _mess);
            if (!checkExisted && scheduleValid) {
                if (_status == 'create') {
                    createSchedule();
                } else if (_status == 'update') {
                    updateSchedule();
                }
            }
        })
}

function removeSchedule() {

}

async function getPages() {
    var PAGESIZE = 10;
    var pages = 0;
    const res = await fetch(url_getAllSchedule, { method: 'GET', headers: { Authorization: token } });
    const data = await res.json();
    pages = (data.length - data.length % PAGESIZE) / PAGESIZE;
    if (data.length % PAGESIZE != 0) {
        pages++;
    }
    totalPages = pages;
    return pages;
}


function updateScheduleStatus(id, status) {
    var isStatus = status == 'true';
    var _data = {
        scheduleID: id
    }

    console.log(_data);

    fetch(url_updateScheduleStatus, {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_data)
    })
        .then(res => res.status)
        .then(data => {
            if(data == 200 && isStatus){
                showGeneralModal('Remove Successful');
            }else if(data == 200 && !isStatus){
                showGeneralModal('Restore Successful');
            }else if(data == 409 && isStatus){
                showGeneralModal('Cannot Remove. One or more employee is using this schedule.')
            }
        })

}

//EXECUTE
getAllSchedule();
getPages();
displayPageNumber();