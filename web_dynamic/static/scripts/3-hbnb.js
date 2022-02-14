$(document).ready(function () {
    const selectionCheck = [];
    $('input:checkbox').change(function () {
      // debugger
      if ($(this).is(':checked')) {
        selectionCheck.push($(this).attr('data-name'));
      } else {
        const index = selectionCheck.indexOf(($(this).attr('data-name')));
        if (index > -1) {
          selectionCheck.splice(index, 1);
        }
      }
      $('.amenities h4').text(selectionCheck.join('. '));
    });
  
    //getJSON, trae el html como objeto JSON
    $.getJSON('http://192.168.18.11:5001/api/v1/status/', function (response) {
      if (response.status === 'OK') {
        $('div#api_status').addClass('available');
       // $('#api_status').css('color', 'red');
      } else {
        $('div#api_status').removeClass('available');
      }
    });

    $.ajax({
      url: 'http://192.168.18.11:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      dataType:'json',
      success: function (data) {
        //map: traduce los elementos de una matriz u objetos a una nueva matriz de elementos
        data.map((place) => {
        $('section.places').append(
          `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${ place.price_by_night }</div> 
            </div>
            <div class="information">
              <div class="max_guest">
                  <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                  <br />
                  ${place.max_guest} Guests
              </div>
              <div class="number_rooms">
                <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                <br />
                ${place.number_rooms} Bedrooms
              </div>
              <div class="number_bathrooms">
                <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                <br />
                ${place.number_bathrooms} Bathrooms
              </div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`);
        });
      } 
    });
  });
  