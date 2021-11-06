
getAvailableDiscountsAndPaging();

async function getAvailableDiscountsAndPaging() {

    var x = await fetch('https://hair-cut.herokuapp.com/api/getAvailableDiscounts',

        {
            method: "get",
            headers: {

                Authorization: sessionStorage.getItem('token')

            },



        }
    );
    var dataDiscounts = [];
    x.status == 200 ? dataDiscounts = await x.json() : '';
    // console.log(dataEmployee);
    $('#hello').pagination({
        dataSource: dataDiscounts,
        pageSize: 10,
        callback: function (data, pagination) {
            var html = renderDiscounts(data);
            $('#tableDiscounts').html(html);
        }
    })


}

async function getDiableDiscountsAndPaging() {

    var _response = await fetch('https://hair-cut.herokuapp.com/api/getDisableDiscounts',
        {
            method: "get",
            headers: { Authorization: sessionStorage.getItem('token') },
        });

    var dataDiscounts = [];
    _response.status == 200 ? dataDiscounts = await _response.json() : '';

    $('#hello').pagination({
        dataSource: dataDiscounts,
        pageSize: 10,
        callback: function (data, pagination) {
            var html = renderDiscounts(data);
            $('#tableDiscounts').html(html);
        }
    })

}


function changeDiscountsViews() {
    var _discount_show = document.getElementById('discounts-show');
    var _discount_list_title = document.getElementById('discount-list-title');

    if (_discount_show.classList.contains('text-danger')) {
        _discount_show.classList.replace('text-danger', 'text-success');
        _discount_show.innerHTML = '<i class="fas fa-bars"></i>&ensp;Active discounts';
        _discount_list_title.innerHTML = 'Removed discount list';
        getDiableDiscountsAndPaging();
    } else {
        _discount_show.classList.replace('text-success', 'text-danger');
        _discount_show.innerHTML = '<i class="fas fa-bars"></i>&ensp;Removed discounts';
        _discount_list_title.innerHTML = 'Available discount list';
        getAvailableDiscountsAndPaging();
    }
}



function renderDiscounts(discounts) {
    // console.log(employees);

    // var body = document.getElementById('tableEmployees');




    var htmls = discounts.map(function (discount) {

        var startDate = new Date(discount.startDate);
        var endDate = new Date(discount.endDate);

        return `
        <tr id="discount-${discount.discountCode}">
            <td>${discount.discountCode}</td>
            <td>${discount.discountName}</td>
            <td>${discount.value}</td>
            <td>${startDate.toISOString().substring(0, 10)}</td>

            <td>${endDate.toISOString().substring(0, 10)}</td>
          

            <td><a class="${discount.status ? 'btn btn-primary' : 'btn btn-secondary disabled'}" href="discountUpdate.html?id=${discount.discountCode}">Update</a></td>
            ${discount.status ?
                `<td><button onclick="return confirm('Remove this discount ?') ? handleRemoveDiscount('${discount.discountCode}') : '' " type="button" class="btn btn-danger">Remove</button></td>`
                : `<td><button onclick="return confirm('Restore this discount ?') ? restoreDiscount('${discount.discountCode}') : '' " type="button" class="btn btn-success">Restore</button></td>`
            }
        </tr> 
        `


    });


    // console.log(htmls.join(' '));
    return htmls.join(' ');
    // console.log(htmls);
    // body.innerHTML += htmls.join(' ');
}
function handleRemoveDiscount(_discountCode) {

    var _data = {
        discountCode: _discountCode,
        startDate: new Date()
    };

    fetch('https://hair-cut.herokuapp.com/api/discountCodeRemovable',
        {
            method: 'POST',
            headers: { Authorization: sessionStorage.getItem('token'), 'Content-Type': 'application/json' },
            body: JSON.stringify(_data)
        })
        .then(res => {
            if (res.status == 409) {
                alert('Couldn\'t remove this discount. One or more futute appointments is using this discount.')
                return false;
            } else {
                return true;
            }
        })
        .then(check => check ? removeDiscount(_discountCode) : '')
}

function removeDiscount(_discountCode) {

    var _data = {
        discountCode: _discountCode,
        startDate: new Date()
    };

    fetch('https://hair-cut.herokuapp.com/api/removeDiscountByCode?discountCode=' + _discountCode,
        {
            method: 'POST',
            headers: { Authorization: sessionStorage.getItem('token'), 'Content-Type': 'application/json' },
        })
        .then(alert('Removed.'))
        .then(getAvailableDiscountsAndPaging());

}

function restoreDiscount(_discountCode) {

    var _data = {
        discountCode: _discountCode,
        startDate: new Date()
    };

    fetch('https://hair-cut.herokuapp.com/api/restoreDiscountByCode?discountCode=' + _discountCode,
        {
            method: 'POST',
            headers: { Authorization: sessionStorage.getItem('token'), 'Content-Type': 'application/json' },
        })
        .then(alert('Restored.'))
        .then(getDiableDiscountsAndPaging());

}







