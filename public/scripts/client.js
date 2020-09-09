/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {
  console.log( "Document ready!" );

  const tweets = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
  
  renderTweets(tweets);

  
  
});