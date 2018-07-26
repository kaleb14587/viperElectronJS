$(document).ready(function(){
    
});


function openCity(cityName,obj) {

    var i;

    var antgo =document.getElementsByClassName("active") ;
    antgo[0].classList.remove("active");
    obj.classList.add('active');

    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(cityName).style.display = "block";
}
var options = {

};

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
});
document.addEventListener('DOMContentLoaded', function() {

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
});

