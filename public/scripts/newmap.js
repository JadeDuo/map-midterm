


function initMap() {
  let map;

  //start default map at north america
  const options = { center: { lat: 49.406001356798896, lng: -96.07921114305863 }, zoom: 4 }

  // New Map
  map = new google.maps.Map(document.getElementById("map"), options);
}

window.initMap = initMap;

//this tracks the user scrolling around the map, storing the current lat/lng values for the map window to be stored when map is saved at a specific area
google.maps.event.addListener(map, 'idle', function (ev) {
  let bounds = map.getBounds();
  console.log('bounds: ', bounds);

  // store LatLng of the each corner of the map every time map idles (not being dragged/zoomed)
  let ne = bounds.getNorthEast();
  let sw = bounds.getSouthWest();
  let nw = new google.maps.LatLng(ne.lat(), sw.lng());
  let se = new google.maps.LatLng(sw.lat(), ne.lng());

  console.log(`NE: ${ne} SE: ${se} NW: ${nw} SW: ${sw}`)
});

//this tracks the zoom level of the current google map window so it can be saved to the new map as well
google.maps.event.addListener(map, 'zoom_changed', function () {
  let zoom = map.getZoom();
  console.log(zoom);
});


//MAP FORM DATA /////////////////////////

$(document).ready(() => {

  function getData(form) {
    var formData = new FormData(form);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    console.log(Object.fromEntries(formData));
  }

  document.getElementById("map-form").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
  });

  })

