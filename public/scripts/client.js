/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  console.log( "Document ready!" );

  const renderTweets = function(tweets) {
    // loops through tweets    
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.container').append($tweet);
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }
  
  const createTweetElement = (tweet) => {

    // get date info to populate html
    const tweetDate = new Date(tweet.created_at);
    const tweetYear = tweetDate.getFullYear();
    const tweetMonth = tweetDate.getMonth() + 1;
    const tweetDay = tweetDate.getDate();

    // return entire html structure of tweet
    // this is JQuery and says 'create this html markup'
    const $tweet = $(`<section class="posted-tweet">
    <article class="tweet">
      <header>
        <div class="user-info"><img src="${tweet.user.avatars}"> <span id="user-full-name">${tweet.user.name}</span></div>
        <div class="user-handle">${tweet.user.handle}</div>
      </header>
      <textarea readonly class="posted-tweet" maxlength="140">${tweet.content.text}</textarea>
      <footer>
        <div class="post-date">${tweetYear}-${tweetMonth}-${tweetDay}</div>
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
    console.log('loadtweets just got called');
    $.get('/tweets')
      .then(function (jsonTweets) {
        const newestFirstTweetList = jsonTweets.reverse();
        renderTweets(newestFirstTweetList); // NOW WHAT am i supposed to return something?
       });
    };

  // ----------- INITIAL PAGE LOAD AND EVENT LISTENERS --------
  
    // initial loading page this will run at start of program 
  loadTweets(); 

  // event listener to submit form using JQuery using Ajax  
  const $form = $('#post-tweet');
  let maxCharDisplay = false;
  let zeroCharDisplay = false;
  
  $form.submit( function (event) {
    
    event.preventDefault();
    
    // validation logic
    let charRemaining = $('#counter').val();
    if (charRemaining == 140) {
      console.log('entered the charRemaining == 140 condition');
      if (maxCharDisplay) {
        $('#error-max-characters').slideUp();
        maxCharDisplay = false;
      }
      $('#error-zero-characters').slideDown();
      zeroCharDisplay = true;
    } else if (charRemaining < 0) {
      if (zeroCharDisplay) {
        $('#error-zero-characters').slideUp();
        zeroCharDisplay = false;
      }
      $('#error-max-characters').slideDown();
      maxCharDisplay = true;

    } else {
      $('#error-zero-characters').slideUp();
      $('#error-max-characters').slideUp();
      zeroCharDisplay = false;
      maxCharDisplay = false;
      
      // if character limit is OK, proceed with creating new tweet in database
      // why serialize??? because server is configured to revceive form data as a query string so we need to serialize it
      const newTweet = $(this).serialize(); //returns text=whateveryoutypein
      $.post('/tweets', newTweet) // sending a request to server
      .then(function (response) { // receiving the response
        document.getElementById("post-tweet").reset();
        $('#counter').empty().append("140");
        $('.posted-tweet').replaceWith(loadTweets());
        
        });
    }
  });

}); // end of document ready top bracket

