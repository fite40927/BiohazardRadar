$(document).ready(function () {
    var covidJSON, map;
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/09-19-2020.csv",
        dataType: "text",
        success: function (csv) {
            var csvObj = $.csv.toObjects(csv);
            covidJSON = JSON.parse(JSON.stringify(csvObj));
            console.log(covidJSON);
            map = initMap(covidJSON);
            displayData(map, covidJSON);
        },
        dataType: "text"
    });
});


function initMap(data) {
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 10, center: { lat: 59.9606739, lng: 30.158655100000004 } });
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