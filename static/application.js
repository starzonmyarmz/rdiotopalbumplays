(function(){
  'use strict';

  var html;

  $('.get-albums').on('click', function() {

    var user = $('#username').val();
    var year = $('#year').val();

    if (user && year) {

      $('ul').html('');
      $('html').addClass('form-is-hidden loading-is-visible');
      $('.error').remove();

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
                  $('.loading strong').text(total + ' Albums found...');
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
    } else {
      // Not all the fields are filled out
      // alert('Please enter a Rdio user and year');
      $('.form h1').after('<div class="error">Please enter a valid Rdio user and year</div>')
    }
  });

  $(document).on('keypress', function(evt) {
    if (evt.keyCode === 13) {
      $('.get-albums').click();
    }
  })
}());
