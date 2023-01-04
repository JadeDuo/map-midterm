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
  }
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
    app.controllers[currentRoute]();
    window.history.pushState({}, href, href)
  });
})
