// let {database} = require('./database')

function initMap() {
  let map;

  //start default map at north america
  const options = { center: { lat: 49.406001356798896, lng: -96.07921114305863 }, zoom: 4 }

  // New Map
  map = new google.maps.Map(document.getElementById("map"), options);

  //this tracks the user scrolling around the map, storing the current lat/lng values for the map window to be stored when map is saved at a specific area
  google.maps.event.addListener(map, 'idle', function (ev) {
    let bounds = map.getBounds();
    console.log('bounds: ', bounds);

    let ne = bounds.getNorthEast(); // LatLng of the north-east corner

    let sw = bounds.getSouthWest(); // LatLng of the south-west corder

    let nw = new google.maps.LatLng(ne.lat(), sw.lng());

    let se = new google.maps.LatLng(sw.lat(), ne.lng());

    console.log(`NE: ${ne} SE: ${se} NW: ${nw} SW: ${sw}`)
  });

  //this tracks the zoom level of the current google map window so it can be saved to the new map as well
  google.maps.event.addListener(map, 'zoom_changed', function () {
    let zoom = map.getZoom();
    console.log(zoom);
  });
}

window.initMap = initMap;


//MAP FORM DATA /////////////////////////

//escape function for incoming use- provided text on tweet form to ensure it cannot be used maliciously
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//wrapping return of new map form passed in escape function, wrapped in <p> tag and stored in a var so it could be used in header for building individual tweets below
const safeHTML = `<p>${escape(tweet.content.text)}</p>`;




// CODE FOR THE NEW TWEET FORM /////////////////////////

//grab the new map form from the DOM
const $mapform = $('#mapForm');

//when form submitted with a new map
$form.on('submit', (event) => {

  //slide any prev error message out of view when resubmitted
  $(".error").slideUp();

  //prevent default form action (refresh page/POST)
  event.preventDefault();

  //validate data in the form before url-endcoding or posting
  const tweetContent = $('#tweet-text').val().trim();
  if (!tweetContent) {
    $(".error").slideUp();
    window.setTimeout(
      function () {
        $(".error-message").text("Please enter in a message before Tweet™ing!");
        $(".error").slideDown();
      },
      250
    );


  } else if (tweetContent.length > 140) {
    $(".error").slideUp();
    window.setTimeout(
      function () {
        $(".error-message").text("This Tweet™ is over the 140 char limit, please shorten your tweet!");
        $(".error").slideDown();
      },
      250
    );

  } else if (tweetContent && tweetContent.length < 140) {

    //get the data entered in the form as url-encoded (server requirement)
    const data = $form.serialize();

    //use serialized data to make POST req to /tweets to update database
    $.post('/tweets', data)
      .then(() => {
        loadTweets(); //once tweet DB is updated, reload it in container
        $("textarea").val("");
        $("#counter").val("140");
      });
  }
});


