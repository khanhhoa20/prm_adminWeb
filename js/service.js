function start() {
    getServices(renderServices);
}

start();


function getServices(callback) {
    fetch('https://hair-cut.herokuapp.com/api/services',

        {
            method: "get",
            headers: {

                Authorization: sessionStorage.getItem('token')

            }

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
        <tr>
            <th scope="row">${service.serviceID}</th>
            <td>${service.serviceName}</td>
            <td>${service.durationTime}</td>
            <td>${service.price}</td>
            <td>${service.status}</td>
            <td>${service.discount}</td>
        </tr> 
        `


    });
    // console.log(htmls);
    body.innerHTML += htmls.join(' ');
}

// function getItem() {
//     fetch('https://hair-cut.herokuapp.com/api/services',

//         {
//             method: "get",
//             headers: {

//                 Authorization: sessionStorage.getItem('token')

//             }

//         }
//     )
//         .then(response => response.json())

//         // Displaying results to console
//         .then(data => {
//             console.log(data);

//         });
// }

