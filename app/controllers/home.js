// ---- LOAD DEFAULT MAP --- //

const options = {
  center: { lat: 49.406001356798896, lng: -96.07921114305863 },
  zoom: 4
}

// -------- generate google map with pre-set lat/long  ----------/
const initMap = () => {
  testmap = new google.maps.Map(document.getElementById('map'), options);
};


$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: '/api/mapsdata/all_maps'
  })
    .done((response) => {
      const $usersList = $('#all-maps-list');
      $usersList.empty();

      for (const map of response.maps) {  // Add list of maps associated with user ID
        $(`<a class="all-map-list" href="/api/mapsdata/${map.id}">`).text(map.title).appendTo('#all-maps-list');
      }
    })

  $(document).on('click', '.all-map-list', function (e) {
    e.preventDefault();

    $.ajax({
      method: 'GET',
      url: e.target.href
    })
    .then((response) => {
      setMap = mapDisplay(response)
      testmap = new google.maps.Map(document.getElementById('map'), mapDisplay(response)); // Build new map with AJAX return
      addMarkersArray() // Add markers from DB to map
      })
  });
});

app.onLoad(() => {
  initMap();
})




const mapDisplay = (data) => {
  let options = {};
  const { lat, lng, north, south, east, west, zoom } = data.mapsData[0]

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
    zoom: Number(zoom),
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    rotateControl: false,
    fullscreenControl: false

  }

  return options;
}

//---------- MARKER HELPER FUNCTIONS ----------//
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
