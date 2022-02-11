// Your script must be executed only when DOM is loaded
$(document).ready(function() {
    //if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
    // creates a directory or list
    const Selection_check = []
    // Listen for changes on each input checkbox tag:
    $('input:checkbox').change(function(){
       // debugger
        if ($(this).is(':checked')) {
            //agregamos data-name al final de la lista
            Selection_check.push($(this).attr('data-name'));
        } else {
            // if the checkbox is unchecked, you must remove the Amenity ID from the variable
            const index = Selection_check.indexOf(($(this).attr('data-name')));
            if (index > -1) {
                Selection_check.splice(index, 1);
            }
        }
        // update the h4 tag inside the div Amenities with the list of Amenities checked
        $('.amenities h4').text(Selection_check.join('. '));
    });
});
