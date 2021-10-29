var url_String = window.location.href;
var url = new URL(url_String);
var schlId = url.searchParams.get('id');

var url_getEmployeeByScheduleId = 'https://hair-cut.herokuapp.com/api/employeesBySchedule';
var url_getScheduleDetail = 'https://hair-cut.herokuapp.com/api/findSchedule';

// VIEW SUPPORT

function getScheduleDetailView(data) {
    var scheduleData = document.getElementById('schedule-data');
    scheduleData.innerHTML += `<div class="mb-3">
                                    <span style="display: inline-block;" class="col-7"><b>Schedule ID:</b></span>
                                    <span>${data.scheduleID}</span>
                                </div>
                                <div class="mb-3">
                                    <span style="display: inline-block;" class="col-7"><b>Start time:</b></span>
                                    <span>${getTimeString(data.startTime)}</span>
                                </div>
                                <div class="mb-3">
                                    <span style="display: inline-block;" class="col-7"><b>End time:</b></span>
                                    <span>${getTimeString(data.endTime)}</span>
                                </div>
                                <div class="mb-3">
                                    <span style="display: inline-block;" class="col-7"><b>Status:</b></span>
                                    <span>${data.status}</span>
                                </div>`;
}

function getEmployeeByScheduleIdView(data) {
    var tableData = document.getElementById('table-data');
    for (s of data) {
        tableData.innerHTML += `<tr><td>${s.empEmail}</td>
                                <td>${s.empName}</td>
                                <td>${s.phone}</td><tr/>`;
    }
}

// function get


// UTIL

function getTimeString(str) {
    var splitT = str.split('T');
    var splitDot = splitT[1].split('.');
    return splitDot[0];
}

// CONTROLLER

function getScheduleDetail() {

    var _data = {
        scheduleID: schlId
    }

    fetch(url_getScheduleDetail, {
        method: 'POST',
        headers: { 'Authorization': sessionStorage.getItem('token'), 'Content-Type': 'application/json' },
        body: JSON.stringify(_data)
    })
        .then(res => res.json())
        .then(data => {
            getScheduleDetailView(data);
        })

}


function getEmployeeByScheduleId() {

    var _data = {
        scheduleID: schlId
    }

    fetch(url_getEmployeeByScheduleId, {
        method: 'POST',
        headers: { 'Authorization': sessionStorage.getItem('token'), 'Content-Type': 'application/json' },
        body: JSON.stringify(_data)
    })
        .then(res => res)
        .then(data => {
            
            if(data.status == 200){
                return data.json();
            }else if(data.status == 404){
                document.getElementById('table-data').innerHTML += `<tr><h5 class="mt-4">This Schedule isn't used by any employee</h5></tr>`;
                throw new Error('No Employee');
            }

        })
        .then(_data => {
            getEmployeeByScheduleIdView(_data);
        })

}

// EXECUTE
getScheduleDetail();
getEmployeeByScheduleId();