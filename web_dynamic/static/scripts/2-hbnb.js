const CheckStatus = async () => {
  // Checking status of server in port 5001
  const url = `http://${window.location.hostname}/api/v1/status`;
  await $.get(url, (data) => {
    if (data.status === 'OK') {
      console.log('OK');
      $('#api_status').addClass('available');
      return;
    }
    console.log('NO');
    $('#api_status').removeClass('available');
  });
};

window.addEventListener('load', () => {
  CheckStatus();
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
});
