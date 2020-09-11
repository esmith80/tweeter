/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

// --------- HELPER FUNCTIONS -----------------

// accepts array of tweet objects and appends them to list of tweets 
  const renderTweets = function(tweets) {
    for (const t of tweets) {
      const tweet = createTweetElement(t);
      $('.container').append(tweet);
    }
  }
// accepts a single tweet object (raw form), returns JQuery object $tweet   
  const createTweetElement = (tweet) => {

    const tweetDate = new Date(tweet.created_at);
    const timeSinceTweet = moment(tweetDate).fromNow();

    // return JQuery object which contains html structure of tweet
    const $tweet = $(`<section class="posted-tweet">
    <article class="tweet">
      <header>
        <div class="user-info"><img src="${tweet.user.avatars}"> <span id="user-full-name">${tweet.user.name}</span></div>
        <div class="user-handle">${tweet.user.handle}</div>
      </header>
      <textarea readonly class="posted-tweet" maxlength="140">${tweet.content.text}</textarea>
      <footer>
        <div class="post-date">${timeSinceTweet}</div>
        <div class="tweet-actions"> 
          <img class="tweet-icon"
            src="/images/flag.svg"
            alt="retweet icon"
          />
          <img class="tweet-icon"
            src="/images/heart.svg"
            alt="retweet icon"
          />
          <img class="tweet-icon"
            src="/images/retweet-dark.svg"
            alt="retweet icon"
          />
        </div>
      </footer>
    <article>
    </section>`);

    return $tweet;
  };
  
  const loadTweets = function () {
    $.get('/tweets')
      .then(function (jsonTweets) {
        const newestFirstTweetList = jsonTweets.reverse();
        renderTweets(newestFirstTweetList);
      });
    };

  // ----------- INITIAL PAGE LOAD AND EVENT LISTENERS --------
  
  // initial load of tweets in db 
  loadTweets(); 

  // helper variables for show/hiding error messages
  let maxErrShowing = false;
  let zeroTextErrShowing = false;
  
  // event listener to submit form using JQuery using Ajax  
  $('#post-tweet').submit( function (event) {
    event.preventDefault();

    // validation of tweet content (cannot be empty, cannot be >140 characters)
    let charsLeft = $('#counter').val();
    if (charsLeft == 140) {
      if (maxErrShowing) {
        $('#error-max-characters').slideUp();
        maxErrShowing = false;
      }
      $('#error-zero-characters').slideDown();
      zeroTextErrShowing = true;
    } else if (charsLeft < 0) {
      if (zeroTextErrShowing) {
        $('#error-zero-characters').slideUp();
        zeroTextErrShowing = false;
      }
      $('#error-max-characters').slideDown();
      maxErrShowing = true;
    } else {

      // validation passed, reset error messages
      $('#error-zero-characters').slideUp();
      $('#error-max-characters').slideUp();
      zeroTextErrShowing = false;
      maxErrShowing = false;

      // prep tweet for server and reload page
      const newTweet = $(this).serialize();
      $.post('/tweets', newTweet)
      .then(function (response) {
        document.getElementById("post-tweet").reset();
        $('#counter').empty().append("140");
        $('.posted-tweet').replaceWith(loadTweets());       
      });
    }
  });
}); 

