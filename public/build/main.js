//gulp takes this main.js, appends built controller and views files, into single file main.js (in build) which is passed to index.js
//previously sidebar.js
const app = {
  controllers: {},
  views: {},
  routes: {
    '/': 'home',
    '/myMaps': 'myMaps',
    '/edit': 'edit',
    '/login': 'login',
    '/createMap': 'newMap',
    '/viewMap': 'viewMap',
    '/faveMaps': 'favoriteMaps'
  },
  //defers google map callback info until api has loaded.
  onLoad: function(callback) {
    if (app.ready) {
      callback();
    } else {
      app.loadCallbacks.push(callback);
    }
  },
  loadCallbacks: [],
  //Called when google maps api is loaded and ready
  loaded: function() {
    app.ready = true;
    app.loadCallbacks.forEach((cb) => {
      cb();
    });
  },
  ready: false,
};
//when doc loads, check current path and find matching route.
//using route, updates view and execute linked controller on view load.
$(document).ready(() => {
  const path = window.location.pathname;
  const currentRoute = app.routes[path];
  if (currentRoute) {
    $('.side-content').html(app.views[currentRoute]);
    app.controllers[currentRoute]();
  }

// nav bar links, using href to update view
  $(".nav a").on('click', function(e) {
    e.preventDefault();
    const href = $(this).attr('href');
    const route = app.routes[href];
    const view = app.views[route];

    $('.side-content').html(view);
    app.controllers[route]();
    window.history.pushState({}, href, href)
  });
})
//app.loaded calls the onload callbacks of current controller.
window.initMap = function() {
  app.loaded();
}

app.views['edit'] = `
  <h2>Add locations to your Map!</h2>
  <p>Click on the map to drop your marker at a filming location.</p>
  <form id="new-marker-form">
    <div class="form">
      <table>
        <tr>
          <td class="label">
            <label for="location-name">Location:</label>
          </td>
          <td>
            <input class="field" id="location" name="location_name" type="text" style="width: 200px; margin: .5em" />
          </td>
        </tr>
        <tr>
          <td class="label">
            <label for="location-info">Description:</label>
          </td>
          <td>
            <input class="field" id="info" name="info" type="text" style="width: 200px; margin: .5em" />
          </td>
        </tr>
        <tr>
          <td class="label">
            <label for="img-link">Image URL:</label>
          </td>
          <td>
            <input class="field" id="img" name="img_link" type="text" style="width: 200px; margin: .5em" />
          </td>
        </tr>

        <tr>
          <td></td>
          <td><button type="submit">Submit</button></td>
        </tr>


      </table>
    </div>
  </form>

  <br>

  <div id="marker-view-panel">
    <input id="toggle-markers" type="button" value="Toggle Markers" />
  </div>

`
app.views['favoriteMaps'] = `
  <h2>My Favorite Maps</h2>
  <div id="fave-map-list"></div>

`
app.views['home'] = `<h2>Welcome to Movie Mapper</h2>
<p>list of all user map links here</p>
`
app.views['login'] = `
  <h2>Login Existing User</h2>

  <form action="/login" method="POST">
    <div class="form">
      <table>
        <tr>
          <td class="label">
            <label for="email">Email:</label>
          </td>
          <td>
            <input class="field" id="login-email" type="text" style="width: 200px; margin: .5em" />
          </td>
        </tr>
        <tr>
          <td class="label">
            <label for="password">Password:</label>
          </td>
          <td>
            <input class="field" id="login-password" type="password" style="width: 200px; margin: .5em" />
          </td>
        </tr>


        <tr>
          <td></td>
          <td><button type="submit">Submit</button></td>
        </tr>


      </table>
    </div>
  </form>

  <h2>Register New User</h2>

  <form action="/register" method="POST">
    <div class="form">
      <table>
        <tr>
          <td class="label">
            <label for="email">Email:</label>
          </td>
          <td>
            <input class="field" id="login-email" type="text" style="width: 200px; margin: .5em" />
          </td>
        </tr>
        <tr>
          <td class="label">
            <label for="password">Password:</label>
          </td>
          <td>
            <input class="field" id="login-password" type="password" style="width: 200px; margin: .5em" />
          </td>
        </tr>


        <tr>
          <td></td>
          <td><button type="submit">Submit</button></td>
        </tr>


      </table>
    </div>
  </form>

`
app.views['myMaps'] = `
  <h2>My Created Maps</h2>
  <div id="my-map-list"></div>
`
app.views['newMap'] = `
  <h2>Create a new map!</h2>
  <p>Find an area to capture in the map on the right</p>
  <p>Zoom in/out and drag the map to create the boundaries for your markers!</p>
  <form id ="map-form">
    <div class="form">
      <table>
        <tr>
          <td class="label"><label for="map-title">Map Title:</label></td>
          <td><input class="field" id="map-title" type="text" name="title"></td>
        </tr>
        <tr>
          <td class="label"><label for="map-thumbnail">Map Thumbnail Link:</label></td>
          <td><input class="field" id="map-thumbnail" type="text" name="thumb"></td>
        </tr>
        <div class="error">
          <span><i class="fa-solid fa-triangle-exclamation"></i></span>
          <span class="error-message"></span>
          <span><i class="fa-solid fa-triangle-exclamation"></i></span>
        </div>
        <tr><td class="label"><button type="submit">Save New Map!</button></td></tr>
      </table>
    </div>
</form>

`
app.views['viewMap'] = `
  <h2>Current Map Title (needs to be injected)</h2>
  <p>Created by: Inject user</p>

`
app.controllers['edit'] = () => {
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

window.initMap = initMap;
$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAEQNotfXF5yKQ9yskhfsR4t1tMkS1sjSM&callback=initMap", function(data, textStatus, jqxhr) {
  console.log("Loaded google maps")
});



//MAP FORM DATA /////////////////////////

$(document).ready(() => {

  const getData = form => {
    let formData = new FormData(form);
    let arr = []

    for (let pair of formData.entries()) {
      arr.push(pair[1])
    }

    globalMarkerInfo.location_name = [...arr][0]
    globalMarkerInfo.info = [...arr][1]
    globalMarkerInfo.img_link = [...arr][1]
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

}
app.controllers['favoriteMaps'] = () => {
//load list of maps using ajax request
//will need a query for all maps faved by current user
//build HTML for list of maps data,
//using jQuery insert HTML into <div id="fave-map-list">

app.onLoad(() => {
  //initMap();
})

}
app.controllers['home'] = () => {
//previously app.js
let globalMarkers = {};

let testmap, tempMarker, markers = [];

const getOptions = () => {
  let options = {};

  return $.ajax({
    method: 'GET',
    url: '/api/mapsdata'
  })
  .then(data => {
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
  console.log("home controller");
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

app.onLoad(() => {
  initMap();
})

}
app.controllers['login'] = () => {
app.onLoad(() => {
  //initMap();
})

}
app.controllers['myMaps'] = () => {
//load list of maps using ajax request
//will need a query for all maps created by current user
//build HTML for list of maps data,
//using jQuery insert HTML into <div id="my-map-list">

app.onLoad(() => {
  //initMap();
})

}
app.controllers['newMap'] = () => {
//previously newmap.js
let globalMapInfo = {};

function initMap() {
  console.log("New map controller");
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

}
app.controllers['viewMap'] = () => {
let globalMarker = {};

let testmap, tempMarker, markers = [];

const getOptions = () => {
  let options = {};

  return $.ajax({
    method: 'GET',
    url: '/api/mapsdata'
  })
  .then(data => {
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

  globalMarker = {
    lat,
    lng
  }

  console.log(`lat: ${lat}, lng: ${lng}`);
  console.log('marker: ', tempMarker);

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

app.onLoad(() => {
  initMap();
})

}