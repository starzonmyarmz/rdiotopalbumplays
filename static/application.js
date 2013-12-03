(function(){
  'use strict';

  $('button').on('click', function() {
    var user = $('#username').val(),
        year = $('#year').val();

    $.getJSON('/user/' + encodeURIComponent(user), function(data) {
      var key = data.result.key;

      $.getJSON('/albums/' + key, function(data) {
        var html      = '',
            result    = data.result

        console.log(data)

        for (var i = 0, len = result.length; i < len; i++ ) {

          var playCount = 0;

          if (result[i].releaseDate.indexOf(year) === 0) {

            var counts    = '';

            for (var y = 0, len = result[i].tracks.length; y < len; y++) {
              playCount += result[i].tracks[y].playCount;
              counts += '<li>' + result[i].tracks[y].name + ' (' + result[i].tracks[y].playCount + ')</li>';
            }

            html += '<li>' + result[i].name + ' (' + playCount + ')<ul>' + counts + '</ul></li>';
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
