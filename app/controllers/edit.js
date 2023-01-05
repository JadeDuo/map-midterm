//previously app.js
console.log('this is the edit.js controller')

let globalMarkerInfo = {};

let testmap, tempMarker, markers = [];

const getOptions = () => {
  let options = {};

  return $.ajax({
    method: 'GET',
    url: '/api/mapsdata'
  })
  .then(data => {
    const { id, lat, lng, north, south, east, west, zoom } = data.mapsData[0]
    console.log('this is the id: ', id)
    console.log('this is our data: ', data)
    globalMarkerInfo.map_id = id;

    options = {
      center: { lat: Number(lat), lng: Number(lng) },
      restriction: {
        latLngBounds: {
          north: Number(north),
          south: Number(south),
          west: Number(west),
          east: Number(east)
        },
        strictBounds: false
      },
      zoom: Number(zoom)
    }

    console.log(options);
    return options;
  })
};

const addMarkersArray = () => {
  defaultSize = 'height =120px width =198px'
  markerArray = []

  $.ajax({
    method: 'GET',
    url: '/api/markers'
  })
    .then(data => {
      for (const marker of data.markers) {
        const { lat, lng, location_name, info, img_link, img_src } = marker

        markerArray.push({
          coordinates: { lat: Number(lat), lng: Number(lng) },
          iconImage: img_src,
          content: `
          <div style="width: 200px">
          <h4>${location_name || '_missing!'}</h4>
          <p>${info || '_missing!'}</p>
          <img src="${img_link}" ${defaultSize}>
          </div>
          `,
        })
      }
    })
    .done(() => {
      markerArray.forEach(properties => addSetMarkers(properties))
    })
};

const addSetMarkers = properties => {
  let marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: properties.coordinates, // take coords from obj passed via addSetMarkers
    map: testmap,
    draggable: false, // preloaded markers cant be moved
  });

  // function to add preassigned pins on map load

  properties.iconImage && marker.setIcon(properties.iconImage); // if it has an image, use as icon

  if (properties.content) {
    let infoWindow = new google.maps.InfoWindow({ content: properties.content }); // if it has an content, populate into infowindow

    // if pin is clicked, open info window for that pin
    marker.addListener('click', () => infoWindow.open({
      testmap,
      anchor: marker
    }));

    marker.addListener('mouseout', () => setTimeout(() => infoWindow.close(), 5000));
  }
};

const placeMarker = location => {
  tempMarker ?
    tempMarker.setPosition(location) :
    tempMarker = new google.maps.Marker({
      position: location,
      map: testmap,
      animation: google.maps.Animation.DROP,
    })
  ;

  let lat = tempMarker.getPosition().lat();
  let lng = tempMarker.getPosition().lng();

  console.log(`lat: ${lat}, lng: ${lng}`);
  console.log('marker: ', tempMarker);

  globalMarkerInfo.lat = lat,
  globalMarkerInfo.lng = lng

  markers.push(tempMarker);
  showMarkers();
};

// sets the map on all markers in the array.
const setMapOnAll = map => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

const hideMarkers = () => setMapOnAll(null); // removes the markers from the map, but keeps them in the array.

const showMarkers = () => setMapOnAll(testmap); // shows any markers currently in the array.

// deletes all markers in the array by removing references to them.
const deleteMarkers = () => {
  hideMarkers();
  markers = [];
};

// generate google map with pre-set lat/long and zoom for NYC
const initMap = () => {
  getOptions()
    .then(options => {
      testmap = new google.maps.Map(document.getElementById('map'), options);
      console.log('test map:', testmap)

      google.maps.event.addListener(testmap, 'click', event => placeMarker(event.latLng));

      // google.maps.event.addListener(testmap, 'idle', () => newMap(testmap));  <---- If wanting to go to single page only

    })
    .then(() => {
      addMarkersArray()
    })
};




//MAP FORM DATA /////////////////////////

$(document).ready(() => {

  const getData = form => {
    let formData = new FormData(form);
    let arr = []
    console.log(formData.entries);

    for (let pair of formData.entries()) {
      arr.push(pair[1])
    }

    globalMarkerInfo.location_name = [...arr][0]
    globalMarkerInfo.info = [...arr][1]
    globalMarkerInfo.img_link = [...arr][2]
  }

  document.getElementById("new-marker-form").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
    submitData(globalMarkerInfo);
  });

});

const submitData = (data) => {

  console.log(data);

  $.ajax({
    type: 'post',
    url: '/api/markers/newmarker',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      console.log('post success')
    }
  })
}

app.onLoad(() => {
  initMap();
})
