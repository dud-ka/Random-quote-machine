//zmienne
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var prefix = "https://cors-anywhere.herokuapp.com/";


//funkcje
function getQuote() {
	$.ajaxSetup({ cache: false });
  $.getJSON(prefix + quoteUrl, createTweet); //zmienna quoteUrl, funkcja którą wywołamy w razie sukcesu
}

function createTweet(input) {
 var data = input[0];

 var quoteText = $(data.content).text().trim();
 var quoteAuthor = data.title;
 var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

 if (!quoteAuthor.length) {
  quoteAuthor = "Unknown author";
  }

if (tweetText.length > 140) { //jesli długość tweeta jest większa niż 140 znaków, wygeneruj tweet jeszcze raz
  getQuote();
} else {  // jeśli nie jest, do zmiennej tweet przypisz zmienną tweet link (która służy do wysyłania tweetów) oraz nasz cały cytat
	var tweet = tweetLink + encodeURIComponent(tweetText);
	$('.quote').text(quoteText);
	$('.author').text("Author: " + quoteAuthor);
	$('.tweet').attr('href', tweet);
}
}

$(function() {
	getQuote();
	$('.trigger').click(function() {
		getQuote();
	})
});