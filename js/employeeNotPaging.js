getEmployees(renderEmployees);
function getEmployees(callback) {
    fetch('https://hair-cut.herokuapp.com/api/employees',

        {
            method: "get",
            headers: {

                Authorization: sessionStorage.getItem('token')

            },


        }
    )
        .then(response => response.json())


        .then(callback);
}

function renderEmployees(employees) {
    // console.log(employees);

    var body = document.getElementById('tableEmployees');
    var htmls = employees.map(function (employee) {
        var date = new Date(employee.hireDate);
        // console.log(date.toLocaleDateString("en-US"));
        return `
        <tr class="employee-${employee.empEmail}">
            <td>${employee.empEmail}</td>
            <td>${employee.empName}</td>
            <td>${employee.phone}</td>
            <td>${date.toLocaleDateString("en-GB")}</td>
            <td>${employee.status}</td>
            <td>${employee.seatNum}</td>
            <td>${employee.scheduleID}</td>


            <td><a href="/updateEmployee.html?id=${employee.empEmail}">Update</a></td>
            <td><button onclick="handleRemoveEmployee('${employee.empEmail}')" type="button" class="btn btn-danger">Remove</button></td>
        </tr> 
        `


    });
    // console.log(htmls);
    body.innerHTML += htmls.join(' ');
}