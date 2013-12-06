(function(){
  'use strict';

  var html;

  $('.learn-more, .go-back').on('click', function(evt) {
    evt.preventDefault();
    $('html').toggleClass('form-is-hidden learn-is-visible');
  });

  $('.get-albums').on('click', function() {

    var user = $('#username').val();
    var year = $('#year').val();

    $('ul').html('');
    $('html').addClass('form-is-hidden')

    $.getJSON('/user/' + encodeURIComponent(user), function(result) {

      var key   = result.key;
      var html  = '';
      var total = 0;

      var loadAlbums = function(page) {
        $.getJSON('/pop/' + key + '/' + year + '/' + page, function(result) {

          if (result.length > 0) {

            for (var i = 0, len = result.length; i < len; i++ ) {
              if (result[i].releaseDate.indexOf(year) === 0) {
                total++;
                $('.loading span').text(total);
                $('html').addClass('loading-is-visible');
                html += '<li><span><img src="' + result[i].icon + '"></span></li>';
              }
            }

            loadAlbums(page + 1);
          } else {
            if (html) {
              $('ul').append(html);
            } else {
              $('ul').append('<li>No albums this year...</li>')
            }
            $('html').toggleClass('loading-is-visible albums-are-visible');
          }
        });
      }

      loadAlbums(0);
    });
  });
}());
