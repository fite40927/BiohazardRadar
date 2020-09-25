$(document).ready(function () {
    var map, coviddata, sarsdata, mersdata, eboladata;
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/09-19-2020.csv",
        dataType: "text",
        success: function (csv) {
            var csvObj = $.csv.toObjects(csv);
            coviddata = JSON.parse(JSON.stringify(csvObj));
            console.log(coviddata);
            map = initMap(59.9606739, 30.158655100000004);
            displayData(map, coviddata);
        }
    });
    $.getJSON("https://raw.githubusercontent.com/fite40927/BiohazardRadar/master/data/sars.json", function(data){
        sarsdata = data;
    });
    $('.nav-tabs a').click(function () {
        $(this).tab('show');
    })
    $("#cvd").click(function(){
        map = initMap(59.9606739, 30.158655100000004);
        displayData(map, coviddata);
    });
    $("#srs").click(function(){
        map = initMap(39.916668, 116.383331);
        displayData(map, sarsdata);
    });
});


function initMap(lt, lg) {
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 10, center: { lat: lt, lng: lg } });
    return map;
}

function displayData(map, data) {
    var infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < data.length; i++) {
        var coord = new google.maps.LatLng(data[i].Lat, data[i].Long_);
        var marker = new google.maps.Marker({ position: coord, map: map, title: data[i].Country_Region });

        var location = (data[i].Admin2 == '' ? '' : (data[i].Admin2 + ', ')) +
            (data[i].Province_State == '' ? '' : (data[i].Province_State + ', ')) +
            data[i].Country_Region;
        marker.content = '<b>' + location +
            '</b><br>Confirmed Cases: ' + data[i].Confirmed +
            '<br>Deaths: ' + data[i].Deaths +
            '<br>Recovered: ' + data[i].Recovered +
            '<br>Active Cases: ' + data[i].Active +
            '<br>Last updated: ' + data[i].Last_Update;


        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(this.content);
            infoWindow.open(this.getMap(), this);
        });
    }
}