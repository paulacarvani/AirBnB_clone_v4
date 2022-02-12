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

  $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
