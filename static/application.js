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
    $('html').addClass('form-is-hidden loading-is-visible')

    $.getJSON('/user/' + encodeURIComponent(user), function(result) {

      var key   = result.key;
      var html  = '';
      var total = 0;

      var loadAlbums = function(page) {
        $.getJSON('/popular/' + key + '/' + year + '/' + page, function(result) {

          if (result.length > 0) {

            for (var i = 0, len = result.length; i < len; i++ ) {
              var r = result[i];
              if (r.releaseDate.indexOf(year) === 0) {
                total++;
                $('.loading span').text(total);
                html += '<a href="' + r.shortUrl + '" class="album"><span><img src="' + r.bigIcon + '"></span><div class="details"><h3>' + r.name + '</h3><h4>' + r.artist + '</h4></div></a>';
              }
            }

            // Load more albums starting at the next page
            loadAlbums(page + 1);
          } else {
            if (html) {
              $('.user').text(user);
              $('.year').text(year);
              $('.albums').append(html);
            } else {
              $('.albums').append('No albums this year...')
            }
            $('html').toggleClass('loading-is-visible albums-are-visible');
          }
        });
      }

      // Kick off the album loading at page 0
      loadAlbums(0);
    });
  });
}());
