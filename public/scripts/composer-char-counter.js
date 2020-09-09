$(document).ready(function() {

  const $tweetText = $('#tweet-text');

  $('#tweet-text').on('keyup', function () {

    let tweetLength = $(this).val().length;
    const maxChar = 140;
    const $counter = $(this).siblings('div').find('output'); // why best practice?

    if (tweetLength > maxChar) {
        $($counter).css('color', 'red');
    } else {
        $($counter).css('color', 'inherit');
    }
    tweetLength = maxChar - tweetLength;
    let value = $($counter).text(tweetLength);
  });
   
});

