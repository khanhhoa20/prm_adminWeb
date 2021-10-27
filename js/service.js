function start() {
    getServices(renderServices);
}

start();


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
            <th scope="row">${service.serviceID}</th>
            <td>${service.serviceName}</td>
            <td>${service.durationTime}</td>
            <td>${service.price}</td>
            <td>${service.status}</td>
            <td>${service.discount}</td>
            <td><a>Update</a></td>
            <td><button onclick="handleRemoveService('${service.serviceID}')" type="button" class="btn btn-danger">Remove</button></td>
        </tr> 
        `


    });
    // console.log(htmls);
    body.innerHTML += htmls.join(' ');
}


function handleRemoveService(serviceID) {


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
var modal = document.getElementById('modal');
var showBtn = document.getElementById('show');
var yesBtn = document.getElementById('yes');
var noBtn = document.getElementById('no');

// Setup an event listener for the show button.
showBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Show the modal.
    modal.showModal();
});

// Setup an event listener for the close button.
yesBtn.addEventListener('click', function (e) {
    // e.preventDefault();

    // // Close the modal.
    // modal.close();

    console.log("yes");

});
