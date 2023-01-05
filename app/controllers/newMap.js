//previously newmap.js
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
    let north = bounds.getNorthEast().toJSON().lat, east = bounds.getNorthEast().toJSON().lng;
    let south = bounds.getSouthWest().toJSON().lat, west = bounds.getSouthWest().toJSON().lng;
    let center = bounds.getCenter().toJSON(), zoom = map.getZoom();

    globalMapInfo = {
      north, east, south, west,
      center_lat: center.lat,
      center_lng: center.lng,
      zoom,
      creator_id: 2
    }

  });
}

app.onLoad(() => {
  initMap();
});

//MAP FORM DATA /////////////////////////



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
    submitData(globalMapInfo);
  });



const submitData = (data) => {

  console.log(data);

  $.ajax({
    type: 'post',
    url: '/api/mapsdata/newmap',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      console.log('post success')
    }
  })
}
