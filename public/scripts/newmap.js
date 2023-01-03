let globalMapInfo = {};

function initMap() {
  let map;

  //start default map at north america
  const options = { center: { lat: 49.406001356798896, lng: -96.07921114305863 }, zoom: 4 }

  // New Map
  map = new google.maps.Map(document.getElementById("map"), options);

  //this tracks the user scrolling around the map, storing the current lat/lng values for the map window to be stored when map is saved at a specific area
  google.maps.event.addListener(map, 'idle', () => {

    let bounds = map.getBounds();

    // store LatLng of the each corner of the map every time map idles (not being dragged/zoomed)
    let n = bounds.getNorthEast().toJSON().lat, e = bounds.getNorthEast().toJSON().lng;
    let s = bounds.getSouthWest().toJSON().lat, w = bounds.getSouthWest().toJSON().lng;
    let center = bounds.getCenter().toJSON(), zoom = map.getZoom();

    globalMapInfo = {
      n, e, s, w,
      center_lat: center.lat,
      center_lng: center.lng,
      zoom,
      userid: 2
    }

  });
}

window.initMap = initMap;

//MAP FORM DATA /////////////////////////

$(document).ready(() => {

  const getData = form => {
    let formData = new FormData(form);
    let arr = []

    for (let pair of formData.entries()) {
      arr.push(pair[1])
    }

    globalMapInfo.title = [...arr][0]
    globalMapInfo.thumb = [...arr][1]
  }

  document.getElementById("map-form").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
  });

})
