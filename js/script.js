function formatDate(start, end) {

    var start_date = new Date(start);
    var end_date = new Date(end);

    var day = start_date.getDate();
    var month = start_date.getMonth() + 1; // the returned months are 0-11
    var year = start_date.getFullYear();

    var start_hour = start_date.getHours();
    var start_mins = start_date.getMinutes();

    var end_hour = end_date.getHours();
    var end_mins = end_date.getMinutes();

    var date = day + "/" + month + "/" + year + " ";

    // add leading 0 and return last two characters to make sure we use 00:00 format
    date +=  ("0"+start_hour).slice(-2) + ":" + ("0"+start_mins).slice(-2) + " - " +
        ('0' + end_hour).slice(-2) + ":" +  ( "0" + end_mins).slice(-2);

    return date;
}

function retrieveGenres() {
    $.ajax({
        url: 'http://www.bbc.co.uk/tv/programmes/genres.json',
        dataType: 'json',
    }).done(function(data) {
        $.each(data.categories, function(index, value) {
          $('#genres').append('<li>' + value.key + '</li>')
        })
    });
}














