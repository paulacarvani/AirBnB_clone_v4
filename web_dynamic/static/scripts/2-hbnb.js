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
});
