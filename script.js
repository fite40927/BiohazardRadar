$(document).ready(function() {
    load("navbar", "nav.html");
});

function load(id, filename){
    $("#" + id).html('<object type="text/html" data="' + filename + '" ></object>');
};