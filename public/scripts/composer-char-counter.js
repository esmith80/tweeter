
// Why were we asked to put this in a file by itself?

// counts characters as they are typed in tweet textarea, dynamically updates remaining characters for user
$(document).ready(function() {

  $('#tweet-text').on('keyup', function () {
    let tweetLength = $(this).val().length;
    const maxChar = 140;
    const $counter = $(this).siblings('div').find('output');
    if (tweetLength > maxChar) {
      $($counter).css('color', 'red');
    } else {
      $($counter).css('color', 'inherit');
    }    
    tweetLength = maxChar - tweetLength;
    $($counter).text(tweetLength);
  });   
});

