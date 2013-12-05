(function(){
  'use strict';

  $('button').on('click', function() {
    var user = $('#username').val(),
        year = $('#year').val();

    $('ul').html('');

    $.getJSON('/user/' + encodeURIComponent(user), function(result) {
      var key = result.key;

      var loadAlbums = function(page) {
        $.getJSON('/popular/' + key + '/' + year + '/' + page, function(result) {
          var html = '';

          if (result.length > 0) {
            for (var i = 0, len = result.length; i < len; i++ ) {
              html += '<li><span><img src="' + result[i].icon + '"></span></li>';
            }
            loadAlbums(page + 1);
          } else {
            console.log('done');
          }

          if (html) {
            $('ul').append(html);
          } else {
            $('ul').append('<li>No albums this year...</li>')
          }

        });
      }

      loadAlbums(0);
    });
  });
}());
