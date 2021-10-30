//giao diện phần sidebar
fetch('/share/dashboard.html')
    .then(function (response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function (html) {
        // Initialize the DOM parser
        var parser = new DOMParser();

        // Parse the text
        var doc = parser.parseFromString(html, "text/html");

        // You can now even select part of that html as you would in the regular DOM 
        // Example:
        var sidebar = doc.querySelector('.sidebar');
        var thanhsearch = doc.querySelector('.thanhsearch')
        document.getElementById("sidebar").append(sidebar);
        document.getElementById("thanhsearch").append(thanhsearch);

        //Cách chỉnh màu cam được chọn ở sidebar
        //xóa class active cũ đi  và
        // nếu url chứa ... thì thêm class active vào element có id là... 
        //example
        // console.log(window.location.href.includes("service")); 

        //nếu url chứa service thì
        // if (window.location.href.includes("service")){
        //xóa class active ở sidebar service
        //document.querySelector(".active").classList.remove("active");  
        //(màu cam đc chọn mất)
        //     
        //thêm class active ở service     
        //document.getElementById('chooseService').classList.add('active'); 
        //màu cam chọn xuất hiện :v
        // }
        if (window.location.href.includes("schedule")) {
            document.querySelector(".active").classList.remove("active");
            document.getElementById('chooseSchedule').classList.add('active');
        }

        if (window.location.href.includes("employee")) {
            document.querySelector(".active").classList.remove("active");
            document.getElementById('chooseEmployee').classList.add('active');
        }
        if (window.location.href.includes("appointment")) {
            document.querySelector(".active").classList.remove("active");
            document.getElementById('chooseAppointment').classList.add('active');
        }



        if (window.location.href.includes("ervice")) {
            document.querySelector(".dashboard").innerHTML = "Service";
        }

        if (window.location.href.includes("schedule")) {
            document.querySelector(".dashboard").innerHTML = "Schedule";
        }
        if (window.location.href.includes("employee")) {
            document.querySelector(".dashboard").innerHTML = "Employee";
        }
        if (window.location.href.includes("appointment")) {
            document.querySelector(".dashboard").innerHTML = "Appointment";
        }


        var script = document.createElement("script");  // create a script DOM node
        script.src = "/js/auth.js";  // set its src to the provided URL

        document.body.appendChild(script);  // add it to the end of the body section of the page (could change 'head' to 'body' to add it to the end of the body section instead)



        // console.log(document.querySelector(".logout"));
        // console.log(document);



    })
    .catch(function (err) {
        console.log('Failed to fetch page: ', err);
    });

