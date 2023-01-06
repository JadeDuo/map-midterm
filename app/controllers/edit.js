// ------------------ MAP DATA ----------------- ///

let testmap, tempMarker;
let globalMarkerInfo = {};

const initMap = () => {
  testmap = new google.maps.Map(document.getElementById('map'), setMap); // Build new map with AJAX return
  google.maps.event.addListener(testmap, 'click', event => placeMarker(event.latLng)); // Place temp marker on map
}

const placeMarker = (location) => {
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

  globalMarkerInfo.lat = lat,
  globalMarkerInfo.lng = lng
  globalMarkerInfo.map_id = setMap.id
};

app.onLoad(() => {
  new Promise((resolve, reject) => {
    initMap()
    resolve()
  })
  .then(() => {
    addMarkersArray()
  })
  .catch(console.log)

})

// --------- FORM DATA ----------- //

$(document).ready(() => {

  const getData = form => {
    let formData = new FormData(form);
    let arr = []

    const genre = $("#genre-id option:checked").val();

    for (let pair of formData.entries()) {
      arr.push(pair[1])
    }

    globalMarkerInfo.location_name = [...arr][0]
    globalMarkerInfo.info = [...arr][1]
    globalMarkerInfo.img_link = [...arr][2]
    globalMarkerInfo.icon_id = genre
  }

  document.getElementById("new-marker-form").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
    submitData(globalMarkerInfo);
    $(".nav a[href='/myMaps']").click();
    setTimeout(() => {
      tempMarker = {};
      addMarkersArray()
    }, 500);
  });

});

const submitData = (data) => {
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
