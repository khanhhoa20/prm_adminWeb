
getDiscountsAndPaging();

async function getDiscountsAndPaging() {

    var x = await fetch('https://hair-cut.herokuapp.com/api/getAvailableDiscounts',

        {
            method: "get",
            headers: {

                Authorization: sessionStorage.getItem('token')

            },



        }
    );
    var dataDiscounts = await x.json()
    // console.log(dataEmployee);
    $('#hello').pagination({
        dataSource: dataDiscounts,
        pageSize: 20,
        showGoInput: true,
        showGoButton: true,
        showPrevious: false,
        showNext: false,
        callback: function (data, pagination) {
            var html = renderDiscounts(data);
            $('#tableDiscounts').html(html);
        }
    })


}



function renderDiscounts(discounts) {
    // console.log(employees);

    // var body = document.getElementById('tableEmployees');




    var htmls = discounts.map(function (discount) {

        var startDate = new Date(discount.startDate);
        var endDate = new Date(discount.endDate);

        return `
        <tr id="discount-${discount.discountCode}">
            <td>${discount.discountCode}</td>
            <td>${discount.discountName}</td>
            <td>${discount.value}</td>
            <td>${startDate.toISOString().substring(0, 10)}</td>

            <td>${endDate.toISOString().substring(0, 10)}</td>
          

            <td><a href="discountUpdate.html?id=${discount.discountCode}">Update</a></td>
            <td><button onclick="handleRemoveDiscount('${discount.discountCode}')" type="button" class="btn btn-danger">Remove</button></td>
        </tr> 
        `


    });


    // console.log(htmls.join(' '));
    return htmls.join(' ');
    // console.log(htmls);
    // body.innerHTML += htmls.join(' ');
}
function handleRemoveDiscount(discountCode) {
    console.log(discountCode);
    var bodyContent = document.querySelector('body').innerHTML;
    if (bodyContent.includes("staticBackdrop")) {
        $('#staticBackdrop').remove();
    }
    function removeDiscount() {

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
                    getDiscountsAndPaging();
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

// // createDialog() for removeService;
// function createDialog() {
//     var myModal = `  <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
//     aria-labelledby="staticBackdropLabel" aria-hidden="true">
//     <div class="modal-dialog modal-dialog-centered">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h5 class="modal-title" id="staticBackdropLabel">Message</h5>
//                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">&times;</span>
//                 </button>
//             </div>
//             <div class="modal-body">
//                 Do you want to remove this employee?
//             </div>
//             <div class="modal-footer">
//             <button type="button" class="btn btn-danger" id="confirmRemove">Yes</button>
//                 <button type="button" class="btn btn-success" data-dismiss="modal" id="notRemove">No</button>

//             </div>
//         </div>
//     </div>
// </div>`

//     $('body').append(myModal);

//     // $('#staticBackdrop').modal('show');


// }






