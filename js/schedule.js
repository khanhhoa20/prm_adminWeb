var token = sessionStorage.getItem('token');


//URL
var url_getAllSchedule = 'https://hair-cut.herokuapp.com/api/schedules';




//VIEW SUPPORT
function getAllScheduleView(data) {
    var table_data = document.getElementById('table-data');
    var result = '';
    var PAGESIZE = 1;
    var page = 1;
    for (var i = 0; i < data.length; i++) {
        if(i > 0 && i % PAGESIZE == 0)
            page ++;
        result += `<tr class="page-${page}">
                    <td>${data[i].scheduleID}</td>
                    <td>${getTimeString(data[i].startTime)}</td>
                    <td>${getTimeString(data[i].endTime)}</td>
                    </tr>`;
    }
    table_data.innerHTML += result;
}





//UTIL

function reload() {
    location.reload();
}

function getTimeString(str) {
    var splitT = str.split('T');
    var splitDot = splitT[1].split('.');
    return splitDot[0];
}

function displayPage(pageclass, pages, pagepass){
    var displayingPage = document.getElementsByClassName('page-1');

    for(i of displayingPage){
        console.log('hellu');
        console.log(i.classList.add('hidden'));
    }

    
}

//CONTROLLER
function getAllSchedule() {
    fetch(url_getAllSchedule, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.json())
        .then(data => {
            getAllScheduleView(data);
        })
}



var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}




//EXECUTE
getAllSchedule();
