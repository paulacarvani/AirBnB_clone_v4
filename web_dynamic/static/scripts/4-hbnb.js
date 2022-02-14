$(document).ready(function () {
    //const selectionCheck = [];
    //$('input:checkbox').change(function () {
      // debugger
      //if ($(this).is(':checked')) {
       // selectionCheck.push($(this).attr('data-name'));
      //} else {
       // const index = selectionCheck.indexOf(($(this).attr('data-name')));
        //if (index > -1) {
         // selectionCheck.splice(index, 1);
        //}
      //}
      //$('.amenities h4').text(selectionCheck.join('. '));
    //});
    const selectionCheck = {};
    $(document).on('change', "input[type='checkbox']", function () {
      if (this.checked) {
        selectionCheck[$(this).data('id')] = $(this).data('name');
      } else {
        delete selectionCheck[$(this).data('id')];
      }
      const Objs = Object.values(selectionCheck);
      console.log(Object.values(selectionCheck));
      if (Objs) {
        $('.amenities > h4').text(Object.values(selectionCheck).join(', '));
      } else {
        $('.amenities > h4').html('&nbsp;');
      }
      console.log(selectionCheck);
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
        data: JSON.stringify(selectionCheck),
        dataType:'json',
        success: function (data) {
          //map: traduce los elementos de una matriz u objetos a una nueva matriz de elementos
          data.map((place) => {
          $('section.places').append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${ place.price_by_night }</div> 
              </div>
              <div class="information">
                <div class="max_guest">
                    <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                    <br />
                    ${place.max_guest} Guest${
                      place.max_guest !== 1 ? 's' : ''
                    }
                </div>
                <div class="number_rooms">
                  <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                  <br />
                  ${place.number_rooms} Bedroom${
                    place.number_rooms !== 1 ? 's' : ''
                  }
                </div>
                <div class="number_bathrooms">
                  <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                  <br />
                  ${place.number_bathrooms} Bathroom${
                    place.number_bathrooms !== 1 ? 's' : ''
                  }
                </div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`);
          });
        } 
      });
      $(':button').click(function() {
        $('article').remove();
        $.ajax({
            url: `http://${window.location.hostname}:5001/api/v1/places_search/`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.keys(selectionCheck) }),
            dataType:'json',
            success: function (data) {
          //map: traduce los elementos de una matriz u objetos a una nueva matriz de elementos
          data.map((place) => {
            $('section.places').append(
              `<article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${ place.price_by_night }</div> 
                </div>
                <div class="information">
                  <div class="max_guest">
                      <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                      <br />
                      ${place.max_guest} Guest${
                        place.max_guest !== 1 ? 's' : ''
                      }
                  </div>
                  <div class="number_rooms">
                    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                    <br />
                    ${place.number_rooms} Bedroom${
                      place.number_rooms !== 1 ? 's' : ''
                    }
                  </div>
                  <div class="number_bathrooms">
                    <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                    <br />
                    ${place.number_bathrooms} Bathroom${
                      place.number_bathrooms !== 1 ? 's' : ''
                    }
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
  });
