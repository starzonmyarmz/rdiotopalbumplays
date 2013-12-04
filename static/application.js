(function(){
  'use strict';

  $('button').on('click', function() {
    var user = $('#username').val(),
        year = $('#year').val();

    $('ul').html('');

    $.getJSON('/user/' + encodeURIComponent(user), function(result) {
      var key = result.key;

      $.getJSON('/popular/' + key, function(result) {
        var html = '';

        for (var i = 0, len = result.length; i < len; i++ ) {
          if (result[i].releaseDate.indexOf(year) === 0) {
            html += '<li><img src="' + result[i].icon + '"></li>';
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
