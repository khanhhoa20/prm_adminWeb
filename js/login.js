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
            .then(response => {
                
                response.json(),
                    console.log('Status: ', response.status)
                {
                    if (response.status != 403) {
                        window.location.assign("service.html");
                        sessionStorage.setItem("status","1");
                    
                        // console.log('Status: ', response.status);

                    }
                    else {
                        alert("Email/password not right");

                    }
                }

            })

    }
}