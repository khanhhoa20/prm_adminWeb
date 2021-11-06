getRemoveServicesAndPaging();
async function getRemoveServicesAndPaging() {

    var x = await fetch('https://hair-cut.herokuapp.com/api/disableServices',
        {
            method: "get",
            headers: {
                Authorization: sessionStorage.getItem('token')
            },
        }
    )

    var dataServices = await x.json();
    // console.log(dataEmployee);
    $('#hello').pagination({
        dataSource: dataServices,
        pageSize: 20,
        showGoInput: true,
        showGoButton: true,
        showPrevious: false,
        showNext: false,
        callback: function (data, pagination) {
            var html = renderServices(data);
            $('#tableServices').html(html);
        }
    })


}










function renderServices(services) {
    // console.log(services);

    // var body = document.getElementById('tableServices');
    var htmls = services.map(function (service) {

        return `
        <tr class="service-${service.serviceID}">
            <td>${service.serviceID}</td>
            <td>${service.serviceName}</td>
            <td>${service.durationTime}</td>
            <td>${service.price}</td>
            
            <td>removed</td>
           
            
            <td><button onclick="handleRemoveService('${service.serviceID}')" type="button" class="btn btn-danger">Restore</button></td>
        </tr> 
        `


    });
    return htmls.join(' ');
    // console.log(htmls);
    // body.innerHTML += htmls.join(' ');
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
                Do you want to restore this service?
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

        // const data = { 'serviceID': serviceID };
        let formData = new FormData();
        formData.append('serviceID', serviceID);

        fetch('https://hair-cut.herokuapp.com/api/restoreService',

            {
                method: "post",
                headers: {

                    Authorization: sessionStorage.getItem('token'),


                },
                body: formData


            }
        )
            .then(response => response.json())

            // Displaying results to console
            .then(function () {
                var service = document.querySelector('.service-' + serviceID);
                if (service) {
                    service.remove();
                    getRemoveServicesAndPaging();
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