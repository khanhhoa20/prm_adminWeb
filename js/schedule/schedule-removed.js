//VIEW SUPPORT

function displayRemovedSchedules(){
    var removeBtn = document.getElementById('removed-schedule');
    var schedules = document.getElementsByClassName('schedules-data');
    var _removed_schedule = document.getElementsByClassName('removed');
    var _page_number_container = document.getElementById('page-number-container');
    var _first_page = document.getElementsByClassName('page-1');

    if(removeBtn.classList.contains('btn-light')){
        removeBtn.classList.replace('btn-light', 'btn-warning');
        _page_number_container.classList.add('hidden');
        
        for(var i of schedules){
            if(!i.classList.contains('hidden')){
                i.classList.add('hidden');
            }
        }

        for(var i of _removed_schedule){
            if(i.classList.contains('hidden')){
                i.classList.remove('hidden');
            }
        }
    }else{
        removeBtn.classList.replace('btn-warning', 'btn-light');
        _page_number_container.classList.remove('hidden');

        for(var i of schedules){
            if(!i.classList.contains('hidden')){
                i.classList.add('hidden');
            }
        }

        for(var i of _first_page){
            if(i.classList.contains('hidden')){
                i.classList.remove('hidden');
            }
        }
    }
}


//UTIL