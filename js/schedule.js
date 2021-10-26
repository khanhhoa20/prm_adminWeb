var token = sessionStorage.getItem('token');


//URL
var url_getAllSchedule = 'https://hair-cut.herokuapp.com/api/schedules';




//VIEW SUPPORT
function getAllScheduleView(data){
    var table_data = document.getElementById('table-data');
    
}





//UTIL





//CONTROLLER
function getAllSchedule(){
    fetch(url_getAllSchedule,{
        method: 'GET',
        headers: {
            'Authorization' : token,
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}




//EXECUTE
// getAllSchedule();