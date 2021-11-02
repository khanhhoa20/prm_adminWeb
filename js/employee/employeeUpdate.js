var url_string = window.location.href;
// console.log(url_string);
var url = new URL(url_string);
// console.log(url);
var id = url.searchParams.get("id");
// console.log(id);
start();
function start() {

    getScheduleID(renderSchedulesToForm);
    getEmployee(renderEmployeeToForm);

}

function getEmployee(callback) {
    const data = { 'empEmail': id };
    let formData = new FormData();
    formData.append('empEmail', id);
    fetch('https://hair-cut.herokuapp.com/api/getEmployeeEmpEmail',

        {
            method: "post",
            headers: {

                Authorization: sessionStorage.getItem('token'),

            },
            body: formData

        }
    )
        .then(response => response.json())


        .then(callback)

}

function renderEmployeeToForm(employee) {


    document.getElementById('empEmail').value = employee.empEmail;
    document.getElementById('empName').value = employee.empName;
    document.getElementById('phone').value = employee.phone;
    // console.log(employee.scheduleID);
    document.getElementById('seatNum').value = employee.seatNum;

    // $('.selectpicker').selectpicker('val', employee.scheduleID);


}








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
function renderSchedulesToForm(schedules) {
    getEmployee(getScheduleOfEmployee);
    function getScheduleOfEmployee(emp) {



        var selectOption = document.getElementById('selectSchedule');
        var htmls = schedules.map(function (schedule) {

            return `
            <option value="${schedule.scheduleID}">
            ${schedule.scheduleID}: ${getTimeString(schedule.startTime)} - ${getTimeString(schedule.endTime)}</option>

        `


        });

        selectOption.innerHTML += htmls.join(' ');

        $("#selectSchedule").selectpicker("refresh");
        $('.selectpicker').selectpicker('val', emp.scheduleID);


        // console.log(selectOption);

    }
}


function CutStringToGetScheduleID(str) {
    var split = str.split(':');

    return split[0];
}


window.addEventListener("load", function () {



    function sendData(employee) {

        // console.log(employee);

        // Bind the FormData object and the form element
        const formData = new FormData(form);


        var schesuleID = formData.get("scheduleID") + "";
        console.log("form: " + schesuleID);
        formData.set("scheduleID", CutStringToGetScheduleID(schesuleID));
        formData.append("password", employee.password);
        formData.append("password", employee.password);
        formData.append("roleID", employee.roleID);
        formData.append("status", employee.status);
        formData.append("hireDate", employee.hireDate);
        formData.append("dismissDate", employee.dismissDate);


        fetch('https://hair-cut.herokuapp.com/api/updateEmployeeInfo',

            {
                method: "put",
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
                if (data == 200) {
                    $('#successUpdateEmployee').modal('show');
                }
                else {
                    if (data == 208) {
                        $('#failUpdateExistedSeatNum').modal('show');
                    }
                    else {
                        $('#failUpdateEmployee').modal('show');
                    }
                }


            });


    }
    // Access the form element...

    const form = document.getElementById("myForm");

    // ...and take over its submit event.
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        getEmployee(sendData);

        // sendData();

    });

});
