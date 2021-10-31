
getServices(renderServices);





function getServices(callback) {
    fetch('https://hair-cut.herokuapp.com/api/availableServices',

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



function renderServices(services) {
    // console.log(services);

    var body = document.getElementById('tableServices');
    var htmls = services.map(function (service) {

        return `
        <tr class="service-${service.serviceID}">
            <td>${service.serviceID}</td>
            <td>${service.serviceName}</td>
            <td>${service.durationTime}</td>
            <td>${service.price}</td>
            
            <td>available</td>
           
            <td><a href="/updateService.html?id=${service.serviceID}">Update</a></td>
            <td><button onclick="handleRemoveService('${service.serviceID}')" type="button" class="btn btn-danger">Remove</button></td>
        </tr> 
        `


    });
    // console.log(htmls);
    body.innerHTML += htmls.join(' ');
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
                Do you want to remove this service?
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


function handleRemoveService(serviceID) {
    var bodyContent = document.querySelector('body').innerHTML;
    if (bodyContent.includes("staticBackdrop")) {
        $('#staticBackdrop').remove();
    }
    function removeService() {

        const data = { 'serviceID': serviceID };

        fetch('https://hair-cut.herokuapp.com/api/deleteService',

            {
                method: "post",
                headers: {

                    Authorization: sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(data)


            }
        )
            .then(response => response.json())

            // Displaying results to console
            .then(function () {
                var service = document.querySelector('.service-' + serviceID);
                if (service) {
                    service.remove();
                }
            });
    }
    createDialog();
    $('#staticBackdrop').modal('show');
    $('#confirmRemove').click(function () {
        removeService();
        $('#staticBackdrop').modal('hide')
        // console.log(serviceID);

    });


}


// function handleRemoveService1(serviceID) {


//     Confirm('Remove Service',
//         'Do you want to remove this service?',
//         'Yes', 'No',
//         "http://127.0.0.1:5500/service.html");



//     function Confirm(title, msg, $true, $false, $link) { /*change*/

//         var $content = "<div class='dialog-ovelay'>" +
//             "<div class='dialog'><header>" +
//             " <h3> " + title + " </h3> " +
//             "<i class='fa fa-close'></i>" +
//             "</header>" +
//             "<div class='dialog-msg'>" +
//             " <p> " + msg + " </p> " +
//             "</div>" +
//             "<footer>" +
//             "<div class='controls'>" +
//             " <button class='button button-danger doAction'>" + $true + "</button> " +
//             " <button class='button button-default cancelAction'>" + $false + "</button> " +
//             "</div>" +
//             "</footer>" +
//             "</div>" +
//             "</div>";

//         $('body').prepend($content);
//         $('.doAction').click(function () {
//             removeService();
//             $(this).parents('.dialog-ovelay').fadeOut(500, function () {
//                 $(this).remove();
//             });
//         });
//         $('.cancelAction, .fa-close').click(function () {
//             $(this).parents('.dialog-ovelay').fadeOut(500, function () {
//                 $(this).remove();
//             });
//         });

//     }






//     function removeService() {

//         const data = { 'serviceID': serviceID };

//         fetch('https://hair-cut.herokuapp.com/api/deleteService',

//             {
//                 method: "post",
//                 headers: {

//                     Authorization: sessionStorage.getItem('token'),
//                     'Content-Type': 'application/json'

//                 },
//                 body: JSON.stringify(data)


//             }
//         )
//             .then(response => response.json())

//             // Displaying results to console
//             .then(function () {
//                 var service = document.querySelector('.service-' + serviceID);
//                 if (service) {
//                     service.remove();
//                 }
//             });
//     }

// }

