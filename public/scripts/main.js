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
  onLoad: function (callback) {
    if (app.ready) {
      callback();
    } else {
      app.loadCallbacks.push(callback);
    }
  },
  loadCallbacks: [],
  onViewChange: function (callback) {

  },
  //Called when google maps api is loaded and ready
  loaded: function () {
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

  // makes links and buttons change views, using href to update view and call controller

  //event listeners
  $(".nav a").on('click', handler)
  $("footer a").on('click', handler)

  //fave button event listener for my maps and home
  $(document).on('click', '.fave-button', function (e) {
    e.preventDefault();
    const map_id = { map_id: setMap.id }

    $.ajax({
      type: 'post',
      url: '/api/users/add_fave',
      data: JSON.stringify(map_id),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        console.log('post success')
      }
    })
  })

  //footer logout button listener
  $("footer button").on('click', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/users/logout',
      success: data => console.log('post success')
    })
    let loggedInUser = '';
    $(".nav a[href='/']").click();
    $('#user-name').text('');
    $('.logged-in').hide();
    $('.logged-out').show();
  });
})
// makes links and buttons change views, using href to update view and call controller
const handler = function (e) {
  e.preventDefault();
  const href = $(this).attr('href');
  const route = app.routes[href];
  const view = app.views[route];

  app.onViewChange();
  $('.side-content').html(view);
  app.controllers[route]();
  window.history.pushState({}, href, href)
};


// Logged in user global cookie settings //
let loggedInUser;
let setMap;

//app.loaded calls the onload callbacks of current controller.
window.initMap = function () {
  app.loaded();
}

jQuery.event.special.touchstart = {
  setup: function( _, ns, handle ){
    if ( ns.includes("noPreventDefault") ) {
      this.addEventListener("touchstart", handle, { passive: false });
    } else {
      this.addEventListener("touchstart", handle, { passive: true });
    }
  }
};
