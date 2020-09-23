$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/09-19-2020.csv",
        dataType: "text",
        success: function (csvd) {
            var items = $.csv.toObjects(csvd);
            var jsonobject = JSON.stringify(items);
            console.log(jsonobject);
        },
        dataType: "text"
    });
});