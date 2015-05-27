$(document).ready(function() {
  retrieveGenres();
  getTomorrowsSchedule('drama');
});
$(document).on('click', '#genres li', function() {
  var genre = $(this).text();
  getTomorrowsSchedule(genre);
  $(this).addClass('active');
})

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
  date += ("0" + start_hour).slice(-2) + ":" + ("0" + start_mins).slice(-2) +
    " - " + ('0' + end_hour).slice(-2) + ":" + ("0" + end_mins).slice(-2);
  return date;
}

function retrieveGenres() {
  $.ajax({
    url: 'http://www.bbc.co.uk/tv/programmes/genres.json',
    dataType: 'json',
  }).done(function(data) {
    $.each(data.categories, function(index, value) {
      $('#genres').append('<li>' + value.title + '</li>')
    })
  });
}

function getTomorrowsSchedule(genre) {
  $.ajax({
    url: 'http://www.bbc.co.uk/tv/programmes/genres/' + genre +
      '/schedules/tomorrow.json',
    dataType: 'json',
    beforeSend: function() {
      $('#programmes').empty();
      $('.active').removeClass('active');
      $('#programmes').append(
        '<div class="spinner"><img src="public/imgs/spinner.gif" /></div>'
      );
    }
  }).done(function(data) {
    $('.spinner').remove();
    $.each(data.broadcasts, function(index, value) {
      var title = '<h2>' + this.programme.display_titles.title +
        '</h2>';
      var synopsis = '<h3>' + this.programme.short_synopsis + '</h3>';
      var time = '<p id="time">' + formatDate(this.start, this.end) +
        '</p>';
      var channel = '<h3 class="channel">' + this.service.title +
        '</h3>';
      var image =
        '<img src=http://ichef.bbci.co.uk/images/ic/272x153/' + this.programme
        .image.pid + '.jpg />';
      var duration = '<p>' + Math.floor(this.duration / 60); + '</p>';
      $('#programmes').append('<li>' + channel + title + time + image +
        synopsis + duration + ' minutes' + '</li>')
    })
  });
}