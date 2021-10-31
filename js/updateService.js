var getServiceById = 'https://hair-cut.herokuapp.com/api/findService';
var updateService = 'https://hair-cut.herokuapp.com/api/updateService';

var url_string = window.location.href;
// console.log(url_string);
var url = new URL(url_string);
// console.log(url);
var id = url.searchParams.get("id");
// console.log(id);




getService(renderService);



function getService(callback) {
    const data = { 'serviceID': id };
    fetch(getServiceById,

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


        .then(callback)

}
function renderService(service) {
    console.log(service.discount);
    document.getElementById('serviceID').value = service.serviceID;
    document.getElementById('serviceName').value = service.serviceName;
    document.getElementById('price').value = service.price;
    document.getElementById('discount').value = service.discount;
    document.getElementById('durationTime').value = service.durationTime;
    document.getElementById('status').value = service.status;
}

window.addEventListener("load", function () {
    function sendData() {

        // Bind the FormData object and the form element
        const formData = new FormData(form);

        // console.log(JSON.stringify(Object.fromEntries(formData)));

        fetch(updateService,

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
                // console.log(data);
                if (data == 200) {
                    $('#successUpdateService').modal('show');
                }
                else {
                    if (data == 208) {
                        $('#failUpdateExistedService').modal('show');
                    }
                    else {
                        $('#failUpdateService').modal('show');
                    }
                }


            });


    }
    const form = document.getElementById("myForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();


        sendData();

    });
})
