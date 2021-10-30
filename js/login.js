sessionStorage.removeItem("role");
sessionStorage.removeItem("token");
function getDataFromAPI() {

    console.log('email', document.getElementById('email').value);
    console.log('password', document.getElementById('password').value);
    if (document.getElementById('email').value == '' || document.getElementById('password').value == '') {
        alert("Email/password not null");
    }
    else {

        let formData = new FormData();
        formData.append('empEmail', document.getElementById("email").value);
        formData.append('password', document.getElementById("password").value);
        // fetch('http://haircut-fall-2021.herokuapp.com/api/empLogin?empEmail=' + data.empEmail + '&password=' + data.password,
        fetch('https://hair-cut.herokuapp.com/api/empLogin',

            {
                method: "POST",

                body: formData
            }
        )
            // .then(response => {

            //     // response.json();

            //     {
            //         if (response.status == 200) {
            //             window.location.assign("service.html");
            //             sessionStorage.setItem("status","1");
            //             // console.log(response.json);
            //             // console.log('Status: ', response.status);

            //         }
            //         else {
            //             alert("Email/password not right");

            //         }
            //     }

            // })
            .then(response =>
                response.json()

            )
            .then(data => {
                if (data.status != true) { alert("Email/password not right"); }
                else {
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("role", data.roleID);

                    // sessionStorage.setItem("user", JSON.stringify(data));
                    window.location.assign("service.html");
                }

            });

    }
}