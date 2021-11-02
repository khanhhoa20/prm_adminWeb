
var date = new Date();
console.log(date.toISOString().substring(0, 10));

$('#hireDate').val(date.toISOString().substring(0, 10));



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

        if (formData.get("roleID") == "Staff")
            formData.set("roleID", "st");
        else formData.set("roleID", "ad");
        var schesuleID = formData.get("scheduleID") + "";
        formData.set("scheduleID", CutStringToGetScheduleID(schesuleID));
        var date = new Date();
        formData.set("hireDate", date.toISOString().substring(0, 10));


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
                        if (data == 409) {
                            $('#failCreateExistedSeatNumEmployee').modal('show');
                        }
                        else {
                            $('#failCreateEmployee').modal('show');
                        }
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
