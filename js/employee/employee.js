
async function getEmployeesAndPaging() {
    const formData = new FormData();
    formData.append('roleID', 'st');
    var x = await fetch('https://hair-cut.herokuapp.com/api/getEmployeeStatusTrue',

        {
            method: "post",
            headers: {

                Authorization: sessionStorage.getItem('token')

            },
            body: formData


        }
    );
    var dataEmployee = await x.json();
    // console.log(dataEmployee);
    $('#hello').pagination({
        dataSource: dataEmployee,
        pageSize: 20,
        showGoInput: true,
        showGoButton: true,
        showPrevious: false,
        showNext: false,
        callback: function (data, pagination) {
            var html = renderEmployees(data);
            $('#tableEmployees').html(html);
        }
    })


}

getEmployeesAndPaging();

function renderEmployees(employees) {
    // console.log(employees);

    // var body = document.getElementById('tableEmployees');




    var htmls = employees.map(function (employee) {






        var date = new Date(employee.hireDate);
        // console.log(date.toLocaleDateString("en-US"));
        return `
        <tr id="employee-${employee.empEmail}">
            <td>${employee.empEmail}</td>
            <td>${employee.empName}</td>
            <td>${employee.phone}</td>
            <td>${date.toISOString().substring(0, 10)}</td>
           
            <td>${employee.seatNum}</td>
            <td>${employee.scheduleID}</td>


            <td><a href="/employeeUpdate.html?id=${employee.empEmail}">Update</a></td>
            <td><button onclick="handleRemoveEmployee('${employee.empEmail}')" type="button" class="btn btn-danger">Remove</button></td>
        </tr> 
        `


    });


    // console.log(htmls.join(' '));
    return htmls.join(' ');
    // console.log(htmls);
    // body.innerHTML += htmls.join(' ');
}
function handleRemoveEmployee(empEmail) {
    console.log(empEmail);
    var bodyContent = document.querySelector('body').innerHTML;
    if (bodyContent.includes("staticBackdrop")) {
        $('#staticBackdrop').remove();
    }
    function removeEmployee() {

        let formData = new FormData();
        formData.append('empEmail', empEmail);

        fetch('https://hair-cut.herokuapp.com/api/removeEmployeeByEmpEmail',

            {
                method: "put",
                headers: {

                    Authorization: sessionStorage.getItem('token'),


                },
                body: formData


            }
        )
            .then(response => response.json())

            // Displaying results to console
            .then(function () {
                var employee = document.getElementById('employee-' + empEmail);
                // console.log(employee)
                if (employee) {

                    employee.remove();
                    getEmployeesAndPaging();
                }
            });
    }
    createDialog();
    $('#staticBackdrop').modal('show');
    $('#confirmRemove').click(function () {
        removeEmployee();
        $('#staticBackdrop').modal('hide')


    });


}

// createDialog() for removeService;
function createDialog() {
    var myModal = `  <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Message</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Do you want to remove this employee?
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="confirmRemove">Yes</button>
                <button type="button" class="btn btn-success" data-dismiss="modal" id="notRemove">No</button>
                
            </div>
        </div>
    </div>
</div>`

    $('body').append(myModal);

    // $('#staticBackdrop').modal('show');


}






