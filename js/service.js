//giao diện phần sidebar
fetch('share/dashboard.html')
    .then(function(response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function(html) {
        // Initialize the DOM parser
        var parser = new DOMParser();

        // Parse the text
        var doc = parser.parseFromString(html, "text/html");

        // You can now even select part of that html as you would in the regular DOM 
        // Example:
        var sidebar = doc.querySelector('.sidebar');

      
        document.getElementById("sidebar").append(sidebar);
        var script = document.createElement("script");  // create a script DOM node
        script.src = "js/auth.js";  // set its src to the provided URL
    
        document.body.appendChild(script);  // add it to the end of the body section of the page (could change 'head' to 'body' to add it to the end of the body section instead)



        console.log(document.querySelector(".logout"));
        console.log(sidebar);

        
        
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });

