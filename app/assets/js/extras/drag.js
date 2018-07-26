$(function() {
    /** we set the draggable class to be draggable, we add the containment which will be #boxdemo, so dropable and draggable object cant pass out of this box **/
    $( ".draggable" ).draggable({
        containment:"#boxdemo",
        revert: "invalid"
    });

    $( ".droppable" ).droppable({
        /** tolerance:fit means, the moveable object has to be inside the dropable object area **/
        tolerance: 'fit',
        over: function(event, ui) {
            /** We add the hoverClass when the moveable object is inside of the dropable object **/
            $('.ui-draggable-dragging').addClass('hoverClass');
        },
        out: function(event, ui) {
            /** We remove the hoverClass when the moveable object is outside of the dropable object area **/
            $('.ui-draggable-dragging').removeClass('hoverClass');
        },
        /** This is the drop event, when the draggable object is moved on the top of the dropable object area **/
        drop: function( event, ui ) {
            $( ".droppable" ).addClass('dropClass');
        }
    });
});