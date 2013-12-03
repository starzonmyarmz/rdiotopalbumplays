(function(){
  'use strict';

  $('button').on('click', function() {
    var user = $('#username').val(),
        year = $('#year').val();

    $.getJSON('/user/' + encodeURIComponent(user), function(data) {
      var key = data.result.key;

      $.getJSON('/albums/' + key, function(data) {
        var html = '';

        console.log(data)

        for (var i = 0, len = data.result.length; i < len; i++ ) {
          if (data.result[i].releaseDate.indexOf(year) === 0) {
            html += '<li>' + data.result[i].name + '</li>';
          }
        }

        if (html) {
          $('ul').append(html);
        } else {
          $('ul').append('<li>No albums this year...</li>')
        }

      });

    });
  });

}());
