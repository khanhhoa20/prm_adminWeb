
window.addEventListener("load", function () {
    function sendData() {

        // Bind the FormData object and the form element
        const formData = new FormData(form);


        fetch('https://hair-cut.herokuapp.com/api/createService',

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
                    $('#successCreateService').modal('show');
                }
                else {
                    if (data == 208) {
                        $('#failCreateExistedService').modal('show');
                    }
                    else {
                        $('#failCreateService').modal('show');
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
