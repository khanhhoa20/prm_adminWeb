var url_string = window.location.href;
// console.log(url_string);
var url = new URL(url_string);
// console.log(url);
var id = url.searchParams.get("id");
// console.log(id);

getEmployee(renderEmployee);
function getEmployee(callback) {
    const data = { 'empEmail': id };
    fetch('https://hair-cut.herokuapp.com/api/updateEmployeeInfo',

        {
            method: "put",
            headers: {

                Authorization: sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }
    )
        .then(response => response.json())


        .then(callback)

}

function renderEmployee(employee) {

    document.getElementById('empEmail').value = employee.empEmail;
    document.getElementById('empName').value = employee.empName;
    document.getElementById('phone').value = employee.phone;

    document.getElementById('seatNum').value = employee.seatNum;
    document.getElementById('selected').value = employee.scheduleID;
}







getScheduleID(renderForm);
function getScheduleID(callback) {
    fetch('https://hair-cut.herokuapp.com​/api/availableSchedules',

        {
            method: "get",
            headers: {

                Authorization: sessionStorage.getItem('token')

            },


        }
    )
        .then(response => response.json())

        // Displaying results to console
        .then(callback);
}
function getTimeString(str) {
    var splitT = str.split('T');
    var splitDot = splitT[1].split('.');
    return splitDot[0];
}
function renderForm(schedules) {

    var selectOption = document.getElementById('selectSchedule');
    var htmls = schedules.map(function (schedule) {

        return `
            <option data-tokens="${getTimeString(schedule.startTime)}">
            ${schedule.scheduleID}: ${getTimeString(schedule.startTime)} - ${getTimeString(schedule.endTime)}</option>

        `


    });

    selectOption.innerHTML += htmls.join(' ');

    $("#selectSchedule").selectpicker("refresh");


    // console.log(htmls.join(' '));

    // console.log(selectOption);
}


function CutStringToGetScheduleID(str) {
    var split = str.split(':');

    return split[0];
}

window.addEventListener("load", function () {

    function sendData() {



        // Bind the FormData object and the form element
        const formData = new FormData(form);


        var schesuleID = formData.get("scheduleID") + "";
        formData.set("scheduleID", CutStringToGetScheduleID(schesuleID));



        fetch('https://hair-cut.herokuapp.com/api/addNewEmployee',

            {
                method: "post",
                headers: {

                    Authorization: sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(Object.fromEntries(formData)),


            }
        )
            .then(response => response.status)
            .then(data => {
                console.log(data);
                if (data == 201) {
                    $('#successCreateEmployee').modal('show');
                }
                else {
                    if (data == 208) {
                        $('#failCreateExistedEmployee').modal('show');
                    }
                    else {
                        $('#failCreateEmployee').modal('show');
                    }
                }


            });


    }
    // Access the form element...

    const form = document.getElementById("myForm");

    // ...and take over its submit event.
    form.addEventListener("submit", function (event) {
        event.preventDefault();


        sendData();

    });

});
