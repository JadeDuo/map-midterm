// -------------------- LOAD MAP LISTS & UPDATE MAPS ON CLICK ---------------///
$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: '/api/mapsdata/my_maps'
  })
    .done((response) => {
      addMarkersArray() // Take me out if you want
      const $usersList = $('#my-map-list');
      $usersList.empty();

      for (const map of response.maps) {  // Add list of maps associated with user ID
        $(`<a class="map-list" href="/api/mapsdata/${map.id}">`).text(map.title).appendTo('#my-map-list');
      }
    })

  const mapListListener = function (e) {
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
  }

  $(document).on('click', '.map-list', mapListListener)
  app.onViewChange = function () {
    $(document).off('click', '.map-list', mapListListener)
    console.log('my maps marker listener off.')
  }


});


app.onLoad(() => {


})
//event listener for edit button
$("#edit-button").on('click', handler)

//------------MAP HELPER FUNCTIONS ------------//

const mapDisplay = (data) => {
  let options = {};
  const { lat, lng, north, south, east, west, zoom,id } = data.mapsData[0]

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
    fullscreenControl: false,
    id
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
