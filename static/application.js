(function(){
  'use strict';

  var html;

  $('.get-albums').on('click', function() {

    var user = $('#username').val();
    var year = $('#year').val();

    if (user && year) {

      $('.albums-container').html('');
      $('html').addClass('form-is-hidden loading-is-visible');
      $('.error').remove();

      $.getJSON('/user/' + encodeURIComponent(user), function(result) {

        var key   = result.key;
        var html  = '';
        var plural = '';
        var total = 0;

        var loadAlbums = function(page) {
          $.getJSON('/popular/' + key + '/' + year + '/' + page, function(result) {

            if (result.length > 0) {

              for (var i = 0, len = result.length; i < len; i++ ) {
                var r = result[i];
                if (r.releaseDate.indexOf(year) === 0) {
                  total++;
                  if (total !== 1) {
                    plural = 's';
                  }
                  $('.loading strong').text(total + ' Album' + plural + ' found...');
                  html += '<a class="album" href="' + r.shortUrl + '"><div class="flipper"><div class="front"><img src="' + r.bigIcon + '"></div><div class="back"><div><h3>' + r.name + '</h3><h4>' + r.artist + '</h4></div></div></div></a>';
                }
              }

              // Load more albums starting at the next page
              loadAlbums(page + 1);
            } else {
              if (html) {
                $('.albums .user').html('<a href="//rdio.com/people/' + user + '/">' + user + '</a>');
                $('.albums .year').text(year);
                $('.albums-container').html(html);
              } else {
                $('.albums-container').html('No albums this year...')
              }
              $('html').toggleClass('loading-is-visible albums-are-visible');
            }
          });
        }

        // Kick off the album loading at page 0
        loadAlbums(0);
      });
    } else {
      // Not all the fields are filled out
      $('.form h1').after('<div class="error">Please enter a valid Rdio user and year</div>')
    }
  });

  $(document).on('keypress', function(evt) {
    if (evt.keyCode === 13) {
      $('.get-albums').click();
    }
  });

  $('.reset').on('click', function() {
    $('#username').val('').focus();
    $('html').toggleClass('form-is-hidden albums-are-visible');
  });
}());
