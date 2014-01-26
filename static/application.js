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
      $('.loading strong').text('Searching for albums...')

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
                // if (r.releaseDate.indexOf(year) === 0) {
                  total++;
                  if (total !== 1) {
                    plural = 's';
                  }
                  $('.loading strong').text(total + ' Album' + plural + ' found...');
                  html += '<a class="album" href="' + r.shortUrl + '"><div class="flipper"><div class="front"><img src="' + r.bigIcon + '" onload="$(this).fadeIn();" alt="' + r.title + '"></div><div class="back"><div><h3>' + r.name + '</h3><h4>' + r.artist + '</h4></div></div></div></a>';
                // }
              }

              // Load more albums starting at the next page
              loadAlbums(page + 1);
            } else {
              $('.user').html('<a href="//rdio.com/people/' + user + '/">' + user + '</a>');
              $('.year').text(year);
              if (html) {
                $('.albums-container').html(html);
                $('html').toggleClass('albums-are-visible');
              } else {
                $('html').toggleClass('no-albums-are-visible');
              }
              $('html').toggleClass('loading-is-visible');
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
    $('html').removeClass();
  });
}());
