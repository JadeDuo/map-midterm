// let {database} = require('server/database.js')
let testmap;
// store map markers generated from on.click event listener
let markers = [];

// set restrictions to where map can be scrolled to, locked in on NYC
const bounds = {
  north: 40.89616039605397,
  south: 40.47792645871874,
  west: -74.26642371757031,
  east: -73.66206301791668,
};

// Options for where map
const options = {
  center: { lat: 40.78179630392257, lng: -73.94733313852576 },
  restriction: {latLngBounds: bounds, strictBounds: false},
  zoom: 11 
};

// generate google map with pre-set lat/long and zoom for NYC
const initMap = () => {
  testmap = new google.maps.Map(document.getElementById('map'), options);

  // function to add preassigned pins on map load
  const addSetMarkers = prop => {
    let marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: prop.coordinates, // take coords from obj passed via addSetMarkers
      map: testmap,
      draggable: false, // preloaded markers cant be moved
    });

    prop.iconImage && marker.setIcon(prop.iconImage); // if it has an image, use as icon
  
    if (prop.content) {
      let information = new google.maps.InfoWindow({content: prop.content}); // if it has an content, populate into infowindow

      // if pin is clicked, open info window for that pin
      marker.addListener('click', () => information.open(testmap, marker));
      marker.addListener('mouseout', () => setTimeout(() => information.close(), 5000));
    }
  };

  const addMarkersArray = () => {
    defaultSize = 'height =120px width =198px'
    markerArray = []
        
    $(() => {
      $.ajax({
        method: 'GET',
        url: '/api/markers'
      })
      .then(res => res.markers)
      .then(res => {
        for (const marker of res){
          const {lat, lng, location_name, info, img_link, img_src} = marker
          
          markerArray.push({
            coordinates: { lat: Number(lat), lng: Number(lng) },
            iconImage: img_src,
            content: `
            <div style="width: 200px">
            <h4>${location_name}</h4>
            <p>${info}</p>
            <img src="${img_link}" ${defaultSize}>
            </div>
            `,
          })
        }
      })
      .done(res => {
        markerArray.forEach(marker => addSetMarkers(marker))
      })
    });
  };

  addMarkersArray(); // Adds all markers in object

  let marker;

  const placeMarker = location => {
    marker ?
      marker.setPosition(location) :
      marker = new google.maps.Marker({
        position: location,
        map: testmap,
        animation: google.maps.Animation.DROP,
        // draggable: true,
      });
      
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    console.log(`lat: ${lat}, lng: ${lng}`);
    console.log('marker: ', marker);
    
    markers.push(marker);
    showMarkers();
  };
  
  google.maps.event.addListener(testmap, 'click', event => placeMarker(event.latLng));

  
  // add event listeners for the pin status buttons
  document
    .getElementById("show-markers")
    .addEventListener("click", showMarkers);
  document
    .getElementById("hide-markers")
    .addEventListener("click", hideMarkers);
  document
    .getElementById("delete-markers")
    .addEventListener("click", deleteMarkers);

};


// sets the map on all markers in the array.
const setMapOnAll = map => {
  console.log('test', map)
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// removes the markers from the map, but keeps them in the array.
const hideMarkers = () => setMapOnAll(null);

// shows any markers currently in the array.
const showMarkers = () => setMapOnAll(testmap);

// deletes all markers in the array by removing references to them.
const deleteMarkers = () => {
  hideMarkers();
  markers = [];
};

window.initMap = initMap;